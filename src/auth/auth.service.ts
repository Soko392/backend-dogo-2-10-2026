import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService,
    ) { }
    async login(email: string, passwordPlain: string) {

// 1. Buscamos al usuario en la base de datos (Necesitamos crear este método en usuariosService)
        // Nota: Asumiremos que crearemos un método llamado "findOneByEmail" en el servicio de usuarios.
        const usuario = await this.usuariosService.findOneByEmail(email);
        if (!usuario) {
            throw new UnauthorizedException('Credenciales incorrectas (Email falso)');
        }

        // 2. ¡Comparamos la contraseña de texto plano con el Hash de MySQL!
        const isPasswordValid = await bcrypt.compare(passwordPlain, usuario.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales incorrectas (Password falsa)');
        }

        // 3. Si todo está OK, armamos los datos de la "pulsera" (Payload)
        const payload = {
            sub: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        };
        
        // 4. Firmamos el token y lo devolvemos
        return {
            user: { email: usuario.email, rol: usuario.rol },
            token: await this.jwtService.signAsync(payload),
        };
    }
}
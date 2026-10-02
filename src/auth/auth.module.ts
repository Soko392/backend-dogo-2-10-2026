import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuariosModule } from '../usuarios/usuarios.module'; // <-- Importante
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    UsuariosModule, // Permitimos que Auth use el servicio de Usuarios
    JwtModule.register({
      global: true, secret: 'PALABRA_SUPER_SECRETA_VETERINARIA_2026', // La firma de la pulsera (¡No se la muestres a nadie!)
      signOptions: { expiresIn: '1d' }, // El token expira automáticamente en 1 día 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
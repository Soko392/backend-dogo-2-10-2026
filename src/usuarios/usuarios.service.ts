import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt'; // <-- Importamos Bcrypt

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async findOneByEmail(email: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOneBy({ email });
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // 1. Verificamos si el email ya está registrado (para evitar el choque en MySQL)
    const usuarioExistente = await this.usuarioRepository.findOneBy({
      email:
        createUsuarioDto.email
    });
    if (usuarioExistente) {
      throw new BadRequestException('El correo electrónico ya está registrado en el sistema');
    }

    // 2. ¡PASAMOS LA CONTRASEÑA POR LA LICUADORA!
    // El número 10 es el "Salt rounds" (el nivel de potencia de la licuadora). 10 es el estándar seguro.
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createUsuarioDto.password, salt);

    // 3. Reemplazamos la contraseña de texto plano por el Hash ultra seguro
    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password: hashPassword,
    });

    // 4. Guardamos en MySQL y limpiamos la contraseña de la respuesta por seguridad
    const usuarioGuardado = await this.usuarioRepository.save(nuevoUsuario);
    // @ts-ignore (un truco para que TS nos deje borrar la password del objeto antes de mostrarlo en Postman)
    delete usuarioGuardado.password;
    
    return usuarioGuardado;
  }

  findAll() {
    return `This action returns all usuarios`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }

}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Usuario } from './entities/usuario.entity'; // Importa tu entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]), // <-- ¡ESTA LÍNEA ES LA QUE FALTA!
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService],
  exports: [UsuariosService], // Opcional: si vas a usar UsuariosService en otros módulos
})
export class UsuariosModule {}
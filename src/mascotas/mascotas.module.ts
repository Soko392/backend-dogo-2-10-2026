import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';
import { Mascota } from './entities/mascota.entity'; // Importa tu entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([Mascota]), // <-- ¡ESTA LÍNEA ES LA QUE FALTA!
  ],
  controllers: [MascotasController],
  providers: [MascotasService],
  exports: [MascotasService], // Opcional: si vas a usar MascotasService en otros módulos
})
export class MascotasModule {}
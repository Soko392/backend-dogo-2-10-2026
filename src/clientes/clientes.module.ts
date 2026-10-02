import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { Cliente } from './entities/cliente.entity'; // Importa tu entidad

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente]), // <-- ¡ESTA LÍNEA ES LA QUE FALTA!
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService], // Opcional: si vas a usar ClientesService en otros módulos
})
export class ClientesModule {}
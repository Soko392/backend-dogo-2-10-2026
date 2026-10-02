import { Injectable } from '@nestjs/common';
import { CreateMascotaDto } from './dto/create-mascota.dto.js';
import { UpdateMascotaDto } from './dto/update-mascota.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascota } from './entities/mascota.entity';

@Injectable()
export class MascotasService {
  create(createMascotaDto: CreateMascotaDto) {
    return 'This action adds a new mascota';
  }

  constructor(
    @InjectRepository(Mascota)
    private readonly mascotaRepository: Repository<Mascota>,
  ) { }

  async findAll(): Promise<Mascota[]> {
      return await this.mascotaRepository.find();
    }

  async findOne(id: number): Promise<Mascota> {
      // 1. Buscamos la mascota de forma segura por su ID
      const mascota = await this.mascotaRepository.findOneBy({ id });
      // 2. Si no existe, lanzamos el escudo protector
      if (!mascota) {
        throw new Error(`El mascota con ID #${id} no existe en la veterinaria`);
      }
      // 3. Retornamos la mascota encontrada
      return mascota;
    }
    

  async update(id: number, updateMascotaDto: UpdateMascotaDto): Promise<Mascota> {
    // 1. Buscamos la mascota de forma segura por su ID
    const mascota = await this.mascotaRepository.findOneBy({ id });
    // 2. Si no existe, lanzamos el escudo protector
    if (!mascota) {
      throw new Error(`la mascota con ID #${id} no existe en la veterinaria`);
    }
    // 3. Fusionamos los datos existentes con los cambios que vienen del DTO
    const mascotaActualizado = this.mascotaRepository.merge(mascota, updateMascotaDto);
    // 4. Guardamos los cambios en MySQL
    return await this.mascotaRepository.save(mascotaActualizado);
  }

  async remove(id: number): Promise<{ message: string }> {
    const mascota = await this.mascotaRepository.findOneBy({ id });
    if (!mascota) {
      throw new Error(`No se pudo eliminar: La mascota con ID #${id} no existe`);
    }
    await this.mascotaRepository.remove(mascota); // Lo borra físicamente de la tabla
    return { message: `La mascota #${id} (y sus datos asociados) fue eliminado con éxito` };
  }

}

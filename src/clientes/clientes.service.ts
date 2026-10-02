import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) { }
  
  // ¡Esta función guardará los datos en tu MySQL!
  async create(datosDelCliente: CreateClienteDto): Promise<Cliente> {
    const nuevoCliente = this.clienteRepository.create(datosDelCliente); // Lo prepara
    return await this.clienteRepository.save(nuevoCliente); // Lo guarda en la BD
  }

  async findOne(id: number): Promise<Cliente> {
    // 1. Buscamos al cliente de forma segura por su ID
    const cliente = await this.clienteRepository.findOneBy({ id });
    // 2. Si no existe, lanzamos el escudo protector
    if (!cliente) {
      throw new Error(`El cliente con ID #${id} no existe en la veterinaria`);
    }
    // 3. Retornamos el cliente encontrado
    return cliente;
  }
  
  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }
  
  async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    // 1. Buscamos al cliente de forma segura por su ID
    const cliente = await this.clienteRepository.findOneBy({ id });
    // 2. Si no existe, lanzamos el escudo protector
    if (!cliente) {
      throw new Error(`El cliente con ID #${id} no existe en la veterinaria`);
    }
    // 3. Fusionamos los datos existentes con los cambios que vienen del DTO
    const clienteActualizado = this.clienteRepository.merge(cliente, updateClienteDto);
    // 4. Guardamos los cambios en MySQL
    return await this.clienteRepository.save(clienteActualizado);
  }
  
  async remove(id: number): Promise<{ message: string }> {
    const cliente = await this.clienteRepository.findOneBy({ id });
    if (!cliente) {
      throw new Error(`No se pudo eliminar: El cliente con ID #${id} no existe`);
    }
    await this.clienteRepository.remove(cliente); // Lo borra físicamente de la tabla
    return { message: `El cliente #${id} (y sus datos asociados) fue eliminado con éxito` };
  }
}
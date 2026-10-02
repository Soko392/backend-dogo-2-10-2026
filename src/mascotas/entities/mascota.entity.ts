import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';

@Entity('mascotas')
export class Mascota {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({ length: 50 })
    nombre: string;
    @Column({ length: 50 })
    especie: string;
    @Column({ length: 50 })
    raza: string;
    @Column({ length: 255 })
    foto: string;
    @Column({ length: 500 })
    historia_clinica: string;
    @Column({ name: 'clientes_id' })
    clientesId: number;
    // ¡Aquí creamos la relación! Muchas mascotas pertenecen a UN Cliente
    @ManyToOne(() => Cliente)
    @JoinColumn({ name: 'clientes_id' }) // Apunta a la columna de tu SQL
    cliente: Cliente;
}
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('clientes') // <-- Le dice a TypeORM que esta clase representa a la tabla 'clientes' de tu SQL
export class Cliente {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    @Column({ length: 50 })
    nombre: string;
    @Column({ length: 50 })
    apellido: string;
    @Column({ length: 10 })
    documento: string;
    @Column({ length: 50 })
    direccion: string;
    @Column({ length: 50 })
    localidad: string;
    @Column({ length: 20 })
    telefono: string;
    @Column({ length: 255 })
    foto: string;
    @Column({ length: 100 })
    email: string;
    @Column({ type: 'bigint' })
    usuario_id: number;
    // ... Aquí agregaríamos los demás campos que tienes en tu SQL como localidad, email, etc.
}
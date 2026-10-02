import { IsString, Length, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateClienteDto {
    // 1. ELIMINA EL CAMPO ID: El id no se debe pedir al crear (lo autogenera MySQL).
    // Si lo dejas acá, NestJS rechazará la creación pidiendo un id obligatorio.

    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
    nombre!: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    apellido!: string;

    @IsString()
    @IsNotEmpty()
    @Length(7, 10, { message: 'El documento debe tener entre 7 y 10 dígitos' })
    documento!: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50, { message: 'La direccion debe tener entre 2 y 50 dígitos' })
    direccion!: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 50, { message: 'La localidad debe tener entre 2 y 50 dígitos' })
    localidad!: string;

    @IsString()
    @IsNotEmpty()
    @Length(7, 15, { message: 'El telefono debe tener entre 7 y 15 dígitos' })
    telefono!: string;

    // 2. FOTO OPCIONAL: Si el usuario no sube foto en el formulario, va a fallar si no es @IsOptional
    @IsOptional()
    @IsString()
    foto?: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 40, { message: 'El email debe tener entre 10 y 40 dígitos' })
    email!: string;

    // 3. TRANSFORMADOR A NÚMERO Y OPCIONAL: FormData en React envía el usuario_id como string ("1").
    // Sin @Type(() => Number), NestJS dará error 400 Bad Request.
    @Type(() => Number)
    @IsNumber({}, { message: 'El usuario_id debe ser un número válido' })
    @IsOptional()
    usuario_id?: number;
}
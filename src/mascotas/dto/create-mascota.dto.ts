import { IsString, Length, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMascotaDto {
  // 1. Se elimina el id de la creación

  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  nombre!: string;

  @IsString()
  @IsNotEmpty({ message: 'La especie no puede estar vacía' })
  @Length(2, 50)
  especie!: string;

  @IsString()
  @IsNotEmpty({ message: 'La raza no puede estar vacía' })
  @Length(2, 50, { message: 'La raza debe tener entre 2 y 50 caracteres' })
  raza!: string;

  // 2. Se quita @IsNotEmpty() para que realmente sea opcional
  @IsOptional()
  @IsString()
  foto?: string;

  // 3. Se hace opcional por si el animalito no tiene historial al crearlo
  @IsOptional()
  @IsString()
  historia_clinica?: string;

  // 4. Se transforma la cadena enviada por FormData a número
  @Type(() => Number)
  @IsNumber({}, { message: 'El clienteId debe ser un número válido' })
  @IsNotEmpty({ message: 'Debes asignar la mascota a un cliente' })
  clienteId!: number;
}


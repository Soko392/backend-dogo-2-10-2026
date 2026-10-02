import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  email!: string;

  @IsString({ message: 'La contraseña debe ser un texto' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía' })
  password!: string;

  @IsOptional()
  @IsString({ message: 'El rol debe ser una cadena de texto' })
  rol?: string;
}
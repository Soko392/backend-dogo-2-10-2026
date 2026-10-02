import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { MascotasService } from './mascotas.service';
import { CreateMascotaDto } from './dto/create-mascota.dto';
import { UpdateMascotaDto } from './dto/update-mascota.dto';
import { AuthGuard } from '../auth/guards/auth/auth.guard';

@Controller('mascotas')
@UseGuards(AuthGuard)
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/mascotas',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `mascota-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() createMascotaDto: CreateMascotaDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      createMascotaDto.foto = file.filename;
    }
    return this.mascotasService.create(createMascotaDto);
  }

  @Get()
  findAll() {
    return this.mascotasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mascotasService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('foto', {
      storage: diskStorage({
        destination: './uploads/mascotas',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `mascota-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateMascotaDto: UpdateMascotaDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (file) {
      updateMascotaDto.foto = file.filename;
    }
    return this.mascotasService.update(+id, updateMascotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mascotasService.remove(+id);
  }
}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesModule } from './clientes/clientes.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
@Module({
    imports: [
        // ¡Aquí configuramos la conexión a tu MySQL!
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root', // Tu usuario de MySQL
            password: '', // Tu contraseña de MySQL
            database: 'veterinaria67', // El nombre de tu base de datos
            autoLoadEntities: true, // Carga automáticamente tus tablas mapeadas
            synchronize: false, // En producción se deja en false para cuidar tus datos existentes
        }),
        ClientesModule,
        MascotasModule,
        UsuariosModule,
        AuthModule,
    ],
})
export class AppModule { }
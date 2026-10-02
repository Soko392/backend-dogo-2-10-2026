import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('login')
    @HttpCode(HttpStatus.OK) // Por defecto los POST devuelven 201 (Creado), pero el login es solo un acceso, así que le ponemos 200 OK
    login(@Body() loginBody: { email: string; passwordPlain: string }) {
        return this.authService.login(loginBody.email, loginBody.passwordPlain);
    }
}
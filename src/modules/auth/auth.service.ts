import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ClientsService } from '../clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class AuthService {
  constructor(private clientsService: ClientsService, private jwtService: JwtService) { }
  async login(loginDto: LoginDto) {
    const client = await this.clientsService.findByEmail(loginDto.email)
    if (!client) {
      throw new UnauthorizedException("Invalid email or password")
    }
    if (!await compare(loginDto.password, client.password)) {
      throw new UnauthorizedException("Invalid email or password")
    }
    
    return {
      accessToken: this.jwtService.sign({ email: loginDto.email }, { subject: client.id, secret:process.env.SECRET_KEY }),
      client: {
        id: client.id,
        email: client.email,
        name: client.name,
        telephone: client.telephone,
        registeredAt:client.registeredAt
      }
    }
  }
}
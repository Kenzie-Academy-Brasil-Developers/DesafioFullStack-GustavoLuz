import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Client } from './entities/client.entity';
import { plainToInstance } from 'class-transformer';


@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService){}
  async create(createClientDto: CreateClientDto) {
    const foundClient = await this.prisma.client.findFirst({
      where: { email: createClientDto.email }
    })

    if (foundClient) {
      throw new ConflictException("Email already exists")
    }

    const client = new Client()
    Object.assign(client, createClientDto)
    await this.prisma.client.create({ data: { ...client }})
    return plainToInstance(Client, client)
  }
 

  async findAll() {
    const clients = await this.prisma.client.findMany()
    return plainToInstance(Client, clients)
  }


  async findOne(id: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { id } })
    if (!client) {
      throw new NotFoundException("Client does not exist")
    }
    return plainToInstance(Client, client)
  }

  async findByEmail(email: string): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { email } })
    return client
  }


  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.prisma.client.findUnique({ where: { id } })
    if (!client) {
      throw new NotFoundException("Client does not exist")
    }
    const updatedClient = await this.prisma.client.update({ where: { id }, data: { ...updateClientDto } })
    return plainToInstance(Client, updatedClient)
  
  }

  async remove(id: string) {
    const client = await this.prisma.client.findUnique({ where: { id } })
    if (!client) {
      throw new NotFoundException("Client does not exist")
    }
     await this.prisma.client.delete({where: {id}})
  }
}

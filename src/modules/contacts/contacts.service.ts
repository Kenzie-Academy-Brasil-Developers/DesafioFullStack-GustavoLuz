import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService){}
  async create(createContactDto: CreateContactDto, clientId: string) {
    const contact = Object.assign(new Contact(), createContactDto)
    const newContact = await this.prisma.contact.create({
      data: { ...contact, clientId }
    })
    return newContact
  }

  async findAll() {
    return await this.prisma.contact.findMany();
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findFirst({ where: { id } });
    if (!contact) {
      throw new NotFoundException("contact not found")
    }
    return contact
  }

  async update(id: string, updatecontactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({ where: { id } })
    if (!contact) {
      throw new NotFoundException("contact does not exist")
    }
    const updatedcontact = await this.prisma.contact.update({ where: { id }, data: { ...updatecontactDto } })
    return updatedcontact
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id } })
    if (!contact) {
      throw new NotFoundException("Contact does not exist")
    }
     await this.prisma.contact.delete({where: {id}})
  }
  }

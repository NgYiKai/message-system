import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MessageService {

  constructor(private prisma: PrismaService) { }
  
  async create(createMessageDto: CreateMessageDto) {

    if (createMessageDto.target[0] === "all") {
      const users = await this.prisma.user.findMany({ select: { id: true } });
      const messages = users.map(user => ({
        title: createMessageDto.title,
        content: createMessageDto.content,
        user_id: user.id,
      }));
      
      await this.prisma.message.createMany({ data: messages });
    } else {
      const messages = createMessageDto.target.map(target => ({
        title: createMessageDto.title,
        content: createMessageDto.content,
        user_id: parseInt(target),
      }));
      
      await this.prisma.message.createMany({ data: messages });
    }

  }

  async findAll(userId: number) {
    return await this.prisma.message.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        id: 'desc',
      }
    });
  }


  async findOne(id: number) {
    return await this.prisma.message.findFirst({
      where: {
        id: id,
      }
    });
  }

  async markAsRead(id: number) {
    return this.prisma.message.updateMany({
      where: {
        id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }


}

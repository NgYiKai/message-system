import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email, 
      },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        role:"user"
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      }
    });
  }

}

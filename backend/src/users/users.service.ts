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

    const bcrypt = require('bcrypt');
    let hashedPassword = await bcrypt.hash(createUserDto.password, 10)

    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        role:"user"
      },
    });
  }

  async findAll() {
    const users = (await this.prisma.user.findMany()).filter(
      ({role}) => (role !== 'admin')
    ).map(
      ({password,...user}) => ({ ...user })
    );


    return users
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

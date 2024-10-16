import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('message')
@UseGuards(AuthGuard)
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(['admin'])
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  findAll(@Req() request: Request) {
    return this.messageService.findAll(request['user'].id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.messageService.markAsRead(+id);
  }

}

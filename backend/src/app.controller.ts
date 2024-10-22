import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoItem } from './todolist-create.dto';
import { UpdateTodoItem } from './todolist-update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  async create(@Body() todoItem: CreateTodoItem) {
    return await this.appService.create(todoItem);
  }

  @Post('update')
  async update(@Body() todoItem: UpdateTodoItem) {
    return await this.appService.update(todoItem);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return await this.appService.remove(+id);
  }

  @Get('list')
  async list() {
    return await this.appService.query();
  }
}

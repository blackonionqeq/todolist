import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTodoItem } from './todolist-create.dto';
import { UpdateTodoItem } from './todolist-update.dto';

@Injectable()
export class AppService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async query() {
    return this.prismaService.todoItem.findMany({
      select: { id: true, content: true, createTime: true },
    });
  }
  async create(todoItem: CreateTodoItem) {
    return this.prismaService.todoItem.create({
      data: todoItem,
      select: { id: true, content: true, createTime: true },
    });
  }
  async update(todoItem: UpdateTodoItem) {
    return this.prismaService.todoItem.update({
      where: {
        id: todoItem.id,
      },
      data: todoItem,
      select: { id: true, content: true, createTime: true },
    });
  }
  async remove(id: number) {
    return this.prismaService.todoItem.delete({
      where: { id },
    });
  }
  getHello(): string {
    return 'Hello World!';
  }
}

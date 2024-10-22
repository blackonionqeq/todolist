import { Inject, ParseIntPipe } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { CreateTodoItem } from './todolist-create.dto';
import { UpdateTodoItem } from './todolist-update.dto';

@Resolver()
export class TodolistResolver {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Query('list')
  async list() {
    return await this.prismaService.todoItem.findMany();
  }

  @Query('queryById')
  async queryById(@Args('id', ParseIntPipe) id: number) {
    return await this.prismaService.todoItem.findUnique({
      where: { id },
    });
  }

  @Mutation('create')
  async create(@Args('todoItem') todoItem: CreateTodoItem) {
    return await this.prismaService.todoItem.create({
      data: todoItem,
      select: { id: true, content: true, createTime: true },
    });
  }

  @Mutation('update')
  async update(@Args('todoItem') todoItem: UpdateTodoItem) {
    return await this.prismaService.todoItem.update({
      data: todoItem,
      where: { id: todoItem.id },
      select: { id: true, content: true, createTime: true },
    });
  }

  @Mutation('remove')
  async remove(@Args('id', ParseIntPipe) id: number) {
    return await this.prismaService.todoItem.delete({
      where: { id },
    });
  }
}

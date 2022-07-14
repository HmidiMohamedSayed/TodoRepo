import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.todosService.findOne(name);
  }

  @Put(':name')
  update(@Param('name') name: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(name, updateTodoDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.todosService.remove(name);
  }
}

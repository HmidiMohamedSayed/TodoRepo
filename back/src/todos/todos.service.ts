import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}


  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    var todo:TodoDto=new TodoDto();
    todo.name=createTodoDto.name;
    todo.description=createTodoDto.description;
    todo.duration=createTodoDto.duration;
    todo.status=createTodoDto.status;
    todo.createdAt=new Date();
    if(createTodoDto.status==="ended"){
      todo.endedAt=new Date();
    }
    return new this.todoModel(todo).save();
  }

  async findAll() {
    return this.todoModel.find();
  }

  async findOne(name: string):Promise<Todo> {
    return this.todoModel.findOne({name});
  }

  async update(name: string, updateTodoDto: UpdateTodoDto) {
    var todo=new TodoDto();
    todo.name=updateTodoDto.name;
    todo.description=updateTodoDto.description;
    todo.duration=updateTodoDto.duration;
    todo.status=updateTodoDto.status;
    todo.updatedAt=new Date();
    if(updateTodoDto.status==="ended"){
      todo.endedAt=new Date();
    }
    return this.todoModel.updateOne({name}, {$set:{...todo}});
  }

  async remove(name:string) {
    return this.todoModel.deleteOne({name});
  }
}

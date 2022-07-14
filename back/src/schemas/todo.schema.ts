import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  createdAt: Date;

  @Prop()
  endedAt: Date;

  @Prop()
  duration: number;

  @Prop()
  updatedAt: Date;

  @Prop()
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
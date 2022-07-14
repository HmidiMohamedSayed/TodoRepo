import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from 'app/_models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  readonly API_URL="http://localhost:3000";
  readonly AllTodosPattern="/todos";
  constructor(private httpClient:HttpClient) { }
  getAllTodos(){
    return this.httpClient.get(this.API_URL+this.AllTodosPattern);
  }
getTodo(name:string):Observable<Todo>{
    return this.httpClient.get<Todo>(this.API_URL+this.AllTodosPattern+"/"+name);
}
updateTodo(name:string,fields:Todo):Observable<any>{
    return this.httpClient.put(this.API_URL+this.AllTodosPattern+'/'+name,fields)
}
deleteTodo(name:string):Observable<any>{
    return this.httpClient.delete(this.API_URL+this.AllTodosPattern+'/'+name)
}
deleteAllUsers():Observable<any>{
    return this.httpClient.delete(this.API_URL+this.AllTodosPattern+'delete')
}
createTodo(todo:Todo):Observable<Todo>{
    return this.httpClient.post<Todo>(this.API_URL+this.AllTodosPattern,todo)
}
}

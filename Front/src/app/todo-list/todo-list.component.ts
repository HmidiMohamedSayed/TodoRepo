import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoAddComponent } from 'app/todo-add/todo-add.component';
import { TodoEditComponent } from 'app/todo-edit/todo-edit.component';
import { TodoService } from 'app/_services/todo.service';
declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos:any;
  
  constructor(private dialog:MatDialog,private todoService:TodoService) { }

  ngOnInit() {
   this.todoService.getAllTodos().subscribe(
     (data)=>{this.todos=data;console.log(data)},
   )
  }
  showNotification(from, align,type,message){

    $.notify({
        icon: "notifications",
        message: message

    },{
        type: type,
        timer: 4000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
  createTodo(){
    let dialogRef = this.dialog.open(TodoAddComponent, {
  
    });
  }
  iconClass(status):string{
    if(status=="not started") return "not_started"
    if(status=="in Progress") return "hourglass_empty"
    return "done_outline"
  }
  iconStyle(status):string{
   
    if(status=="not started") return "color:tomato;margin-left: 20%;"
    if(status=="in Progress") return "color:orange;margin-left: 20%;"
    return "color:green;margin-left: 20%;"
    
  }
   onDelete(name:string){
    if(confirm("Are you sure you want to delete todo "+name+" ?")){
    this.todoService.deleteTodo(name).subscribe(
          data=>this.showNotification('top','center','success','Task deleted successfully.'),
          err=>this.showNotification('top','center','warning','Error while deleting.')   
    )
    window.location.reload();
  }} 
  onEdit(name:string){
    let dialogRef = this.dialog.open(TodoEditComponent, {
      data:{
        name:name
      }
    });
  }
}

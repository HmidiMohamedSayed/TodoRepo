import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from 'app/_models/todo.model';
import { TodoService } from 'app/_services/todo.service';

declare var $: any;
export interface DialogData {
  id: number;
}
@Component({
  selector: 'app-user-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})

export class TodoEditComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string},private todoService:TodoService) { }
  public todo:Todo=new Todo();
  public selected;
  todoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl(''),
    status: new FormControl(''),
  });
  ngOnInit(): void {
   this.getTodo(this.data.name)
   this.selected="NOT STARTED"
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

  getTodo(name:string){
    this.todoService.getTodo(name).subscribe(
      todo=>{
        this.todo=todo;
        this.todoForm.patchValue({
          name: todo.name,
          description:todo.description,
          duration: todo.duration,
          status: todo.status,
      })
      },
      err=>console.log(err)
    )
  }
  onUpdate(){
    
    this.todoService.getTodo(this.todoForm.value.name).subscribe(
      (data)=>{console.log(data)
        if(data===null || data.name==this.todo.name){
          this.todoService.updateTodo(this.todo.name,this.todoForm.value).subscribe(
            data=>{
              this.showNotification('top','center','success','Task updated successfully.')},
                err=>this.showNotification('top','center','warning','Error while updating.')
            
          )
          window.location.reload();
      }
    else{
      this.showNotification('top','center','warning','Task already exists')    
    }
    },
    )
  }
  

}

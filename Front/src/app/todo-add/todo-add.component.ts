import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TodoService } from 'app/_services/todo.service';
//import { UserService } from 'app/user-list/user.service';
declare var $: any;
@Component({
  selector: 'app-user-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css']
})
export class TodoAddComponent implements OnInit {

  todoForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    duration: new FormControl(''),
    status: new FormControl(''),
  });
  public selected;

  constructor(private dialog:MatDialog,private todoService:TodoService) { }

 

  ngOnInit(): void {
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
  onCreate(){
    this.todoService.getTodo(this.todoForm.value.name).subscribe(
      (data)=>{console.log(data)
        if(data===null){
        this.todoService.createTodo(this.todoForm.value).subscribe(
          (data1)=>{
            this.showNotification('top','center','success','Task created successfully.')
                      this.todoForm.reset()},
          err=>this.showNotification('top','center','warning','Error while creating.')    
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

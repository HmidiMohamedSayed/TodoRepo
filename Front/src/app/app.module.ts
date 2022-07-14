import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';


import {MatRippleModule
} from '@angular/material/core';
import {MatFormFieldModule,} from'@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { TodoListComponent } from './todo-list/todo-list.component';

import { MatSelectModule } from '@angular/material/select';
import { TodoAddComponent } from './todo-add/todo-add.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { MatSortModule } from '@angular/material/sort';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [ 
    MatAutocompleteModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
   MatProgressBarModule,
   MatDialogModule,
   NgbModule,
   MatSelectModule,
     
  ],
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoAddComponent,
    TodoEditComponent,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,NgbModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

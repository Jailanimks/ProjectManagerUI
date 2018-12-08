import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import {HttpModule, Http} from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserListModalComponent } from './user-list-modal/user-list-modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectListModalComponent } from './project-list-modal/project-list-modal.component';
import { ParentTaskListModalComponent } from './parent-task-list-modal/parent-task-list-modal.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    ProjectComponent,
    TaskComponent,
    ViewTaskComponent,
    UserListModalComponent,
    ProjectListModalComponent,
    ParentTaskListModalComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    RouterModule,
    NgxPaginationModule
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }

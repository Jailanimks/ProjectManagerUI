import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { UserListModalComponent } from './user-list-modal/user-list-modal.component';
import { ProjectListModalComponent } from './project-list-modal/project-list-modal.component';
import { ParentTaskListModalComponent } from './parent-task-list-modal/parent-task-list-modal.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
const routes: Routes = [

   {
    path: 'user',
    component: UserComponent
    },

    {
      path: 'home',
      component: HomeComponent
    },

    {
      path: 'project',
      component: ProjectComponent
      },

      {
        path: 'task',
        component: TaskComponent
        },
       
        {
          path: 'edittask/:id',
          component: EditTaskComponent
        },

        {
          path: 'viewtask',
          component: ViewTaskComponent
          },
          {
            path: 'userlistmodal',
            component: UserListModalComponent
            },

            {
              path: 'projectlistmodal',
              component: ProjectListModalComponent
              },
              {
                path: 'parenttasklistmodal',
                component: ParentTaskListModalComponent
                }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

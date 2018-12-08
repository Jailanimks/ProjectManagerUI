import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../Model/projects';
import { Users } from '../Model/users';
import { Tasks } from '../Model/tasks';
import { ParentTasks } from '../Model/parent-tasks';
import { SharedService } from '../Services/shared.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ProjectListModalComponent } from '../project-list-modal/project-list-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  @ViewChild('f') form: any;
  tasklist: Tasks[];
  projectlist: Projects[];
  userlist: Users[];
  ptasklist: ParentTasks[];
  endTask:Tasks;
  regTask: any = {};
  regUser: any = {};
  regProject: any = {};
  regParentTask: any = {};
  projectId:number;
  projName:string;
  public startdtSortasc:boolean = false;
  public enddtSortasc:boolean = false;
  public prioritySortasc:boolean = false;
  public compSortasc:boolean = false;

  constructor(private _service: SharedService, private router: Router, private modal: NgbModal) { 
    this.GetAllTasksList();
    this.GetAllUsersList();
    this.GetAllProjectList();
    this.GetAllParentTasksList();
  }

  ngOnInit() {
    this.GetAllTasksList();
    this.GetAllUsersList();
    this.GetAllProjectList();
    this.GetAllParentTasksList();
  }


  GetAllTasksList() {
    this._service.GetAllTasks()
      .subscribe(p => this.tasklist = p)
  }

  GetAllUsersList() {
    this._service.GetAllUsers()
      .subscribe(p => this.userlist = p)
  }

  GetAllProjectList() {
    this._service.GetAllProjects()
      .subscribe(p => this.projectlist = p)
  }

  GetAllParentTasksList() {
    this._service.GetAllParentTasks()
      .subscribe(p => this.ptasklist = p)
  }

 
  GetUser(id) {
    this.regUser = this.userlist.find(x => x.UserID === id);
    if (this.regUser !== undefined) {
      return this.regUser.FirstName;
    }
  }

  GetProject(id) {
    this.regProject = this.projectlist.find(x => x.ProjectID === id);
    if (this.regProject !== undefined) {
      return this.regProject.ProjectName;
    }
  }


  GetParentTask(id) {
    this.regParentTask = this.ptasklist.find(x => x.ParentTaskId === id);
    if (this.regParentTask !== undefined) {
      return this.regParentTask.ParentTaskName;
    }
  }



  onEdit(id) {
    this.router.navigate(['/edittask', id]);
  }



  onEndTask(id: number) {

    if (confirm('Are you sure to Complete this Task ?') == true) {
  
      this.endTask = this.tasklist.find(x => x.TaskId === id);
      if (this.endTask !== undefined) {
        this.endTask.Status = true;
        this._service.UpdateTask(id, this.endTask)
          .subscribe(() => {
            this.GetAllTasksList();
            alert('Task Status Updated Successfully...');
          });
      }

    }
  }


  
sortByStartDate()
{
   if(!this.startdtSortasc)
   {
    this.tasklist.sort((a,b)=>a.StartDate.toString().localeCompare(b.StartDate.toString()));
    this.startdtSortasc =true;
  }
    else
    {
    this.tasklist.sort((a,b)=>b.StartDate.toString().localeCompare(a.StartDate.toString())); 
    this.startdtSortasc = false;
    }

}


sortByEndDate()
{
   if(!this.enddtSortasc)
   {
    this.tasklist.sort((a,b)=>a.EndDate.toString().localeCompare(b.EndDate.toString()));
    this.enddtSortasc =true;
  }
    else
    {
    this.tasklist.sort((a,b)=>b.EndDate.toString().localeCompare(a.EndDate.toString())); 
    this.enddtSortasc = false;
    }

}

sortByPriority()
{
   if(!this.prioritySortasc)
   {
    this.tasklist.sort((a,b)=>a.Priority.toString().localeCompare(b.Priority.toString()));
    this.prioritySortasc =true;
  }
    else
    {
    this.tasklist.sort((a,b)=>b.Priority.toString().localeCompare(a.Priority.toString())); 
    this.prioritySortasc = false;
    }

  } 


  sortByCompleted()
  {
     if(!this.compSortasc)
     {
      this.tasklist.sort((a,b)=>a.Status.toString().localeCompare(b.Status.toString()));
      this.compSortasc =true;
    }
      else
      {
      this.tasklist.sort((a,b)=>b.Status.toString().localeCompare(a.Status.toString())); 
      this.compSortasc = false;
      }
  
    } 
  
    Reload()
    {
      this.GetAllTasksList();
    }
  
    OpenProjectModal() {
      const modalRef = this.modal.open(ProjectListModalComponent);
      modalRef.result.then((result) => {
        this.regProject = result;
        this.projName = this.regProject.ProjectName;
        this.projectId = this.regProject.ProjectID;
        if (this.projectId > 0 )
        {
                this.tasklist = this.tasklist.filter(i =>i.ProjectID == this.projectId)
         }
        else
        {
          this.GetAllTasksList();
        }

      }).catch((error) => {
        this.projName = "";
        this.projectId = 0;
        this.GetAllTasksList();
      });
    }
  
   
}

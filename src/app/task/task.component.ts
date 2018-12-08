import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../Model/projects';
import { Users } from '../Model/users';
import { Tasks } from '../Model/tasks';
import { ParentTasks } from '../Model/parent-tasks';
import { SharedService } from '../Services/shared.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserListModalComponent } from '../user-list-modal/user-list-modal.component';
import { ProjectTasks } from '../Model/project-tasks';
import { ProjectListModalComponent } from '../project-list-modal/project-list-modal.component';
import { ParentTaskListModalComponent } from '../parent-task-list-modal/parent-task-list-modal.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  @ViewChild('f') form: any;
  public show: boolean = false;
  public showerror: boolean = false;
  public startdtSortasc: boolean = false;
  public enddtSortasc: boolean = false;
  public prioritySortasc: boolean = false;
  public empidSortasc: boolean = false;
  public compSortasc: boolean = false;
  ManagerName: string;

  projectlist: Projects[];
  userlist: Users[];
  tasklist: Tasks[];
  regTask: any = {};
  regUser: any = {};
  regProject: any = {};
  regParentTask: any = {};
  pitem: ParentTasks;
  item: Tasks;
  obj: any;
  sTitle:string;
  sMessage: string;
  eMessage: string;
  prjName: string;
  submitType: string = 'Save';
  selectedRow: number;
  id: number;  
  isParentTask: boolean = false;
  public enablecontrol: boolean = false;
  edate: Date;


  constructor(private _service: SharedService, private router: Router, private modal: NgbModal) {
    this.InitializeDates();
    this.InitializePriority();
  }

  ngOnInit() {
    this.InitializeDates();
    this.InitializePriority();
  }



  GetAllTasksList() {
    this._service.GetAllTasks()
      .subscribe(p => this.tasklist = p)
  }

  onSave() {
  
    if (this.isParentTask) {
        this.SaveParentTasks();
    }
    else {

      if (new Date(this.regTask.EndDate) < new Date(this.regTask.StartDate)) {
        this.showerror = true;
        this.eMessage = '* End Date cannot before start date';
        return;
      }
      else {
        this.showerror = false;
        this.eMessage = "";
      }

      if (this.form.valid) {
        this.SaveTasks();
        }
    }



  }


  SaveParentTasks() {
    this.pitem = new ParentTasks();
    this.pitem.ParentTaskName = this.regTask.TaskName;
    this.pitem.ProjectID = this.regTask.ProjectID;

      this._service.AddParentTask(this.pitem)
        .subscribe(p => {
          this.GetAllTasksList();
          this.form.resetForm();
          this.show = true;
          this.sMessage = "Parent Task Details added Successfully...";
          this.ClearForm();
        });
  }


  SaveTasks()
  {
    this.item = new Tasks();
    this.item.TaskName = this.regTask.TaskName;
    this.item.ProjectID = this.regTask.ProjectID;
    this.item.Priority = this.regTask.Priority;
    this.item.ParentTaskId = this.regTask.ParentTaskId;
    this.item.StartDate = this.regTask.StartDate;
    this.item.EndDate = this.regTask.EndDate;
    this.item.UserID = this.regTask.UserID;
    if (this.submitType === 'Save') {
      this._service.AddTask(this.item)
        .subscribe(p => {
          this.GetAllTasksList();
          this.form.resetForm();
          this.show = true;
          this.sMessage = "Task Details added Successfully...";
          this.ClearForm();
        });

    }
   
  }


  OpenUserModal() {
    const modalRef = this.modal.open(UserListModalComponent);
    modalRef.result.then((result) => {
      this.regUser = result;
      this.regTask.UserName = this.regUser.FirstName;
      this.regTask.UserID = this.regUser.UserID;
    }).catch((error) => {
      this.regTask.UserName = "";
      this.regTask.UserID = "";
    });
  }

  OpenParentTaskModal() {
    const modalRef = this.modal.open(ParentTaskListModalComponent);
    modalRef.componentInstance.projectId = this.regTask.ProjectID;
    modalRef.result.then((result) => {
      this.regParentTask = result;
      this.regTask.ParentTaskName = this.regParentTask.ParentTaskName;
      this.regTask.ParentTaskId = this.regParentTask.ParentTaskId;
    }).catch((error) => {
      this.regTask.ParentTaskName = "";
      this.regTask.ParentTaskId = "";
    });
  }



  OpenProjectModal() {
    this.regTask.ParentTaskName = "";
    this.regTask.ParentTaskId = "";
    const modalRef = this.modal.open(ProjectListModalComponent);
    modalRef.result.then((result) => {
      this.regProject = result;
      this.regTask.ProjectName = this.regProject.ProjectName;
      this.regTask.ProjectID = this.regProject.ProjectID;
    }).catch((error) => {
      this.regTask.ProjectName ="";
      this.regTask.ProjectID = "";
    });
  }

  showVal() {
    this.regTask.PriorityVal = this.regTask.Priority;
  }


  OnEnableControl() {
    this.InitializePriority();
    this.regTask.ParentTaskName = "";
    this.regTask.ParentTaskId = "";
    this.regTask.UserName = "";
    this.regTask.UserID = "";
    if (this.isParentTask) {
      this.enablecontrol = true;
      this.regTask.StartDate = "";
      this.regTask.EndDate = "";
    }
    else {
      this.enablecontrol = false;
      this.InitializeDates();
    }
  }


  onCancel() {
    this.form.resetForm();
    this.ClearForm();
    this.sMessage = "";
    this.show = false;
    this.showerror = false;
    this.eMessage = "";
    this.InitializePriority();
    this.InitializeDates();
  }

  InitializeDates() {
    this.edate = new Date();
    this.edate.setDate(this.edate.getDate() + 1);
    this.regTask.StartDate = new Date().toISOString().split("T")[0];
    this.regTask.EndDate = this.edate.toISOString().split("T")[0];
  }

  InitializePriority() {
    this.regTask.Priority = 0;
    this.regTask.PriorityVal = this.regTask.Priority;
  }


  ClearForm() {
    this.submitType = 'Save';
    this.regTask.TaskId = "";
    this.regTask.ProjectName = "";
    this.regTask.TaskName = "";
    this.isParentTask = false;
    this.enablecontrol = false;
    this.regTask.ParentTaskName = "";
    this.regTask.UserName = "";
    this.regTask.ProjectID = "";
    this.regTask.UserID = "";
    this.regTask.ParentTaskId = "";
    this.InitializePriority();
    this.InitializeDates();
  }


}

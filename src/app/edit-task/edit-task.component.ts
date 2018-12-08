import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../Model/projects';
import { Users } from '../Model/users';
import { Tasks } from '../Model/tasks';
import { ParentTasks } from '../Model/parent-tasks';
import { SharedService } from '../Services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserListModalComponent } from '../user-list-modal/user-list-modal.component';
import { ProjectTasks } from '../Model/project-tasks';
import { ProjectListModalComponent } from '../project-list-modal/project-list-modal.component';
import { ParentTaskListModalComponent } from '../parent-task-list-modal/parent-task-list-modal.component';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {


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
  ptasklist: ParentTasks[];
  regTask: any = {};
  regUser: any = {};
  regProject: any = {};
  regParentTask: any = {};
  item: Tasks;
  objTask: any;
  sMessage: string;
  eMessage: string;
  prjName: string;

  selectedRow: number;
  id: number;
  isParentTask: boolean = false;
  public enablecontrol: boolean = false;
  edate: Date;


  constructor(private route: ActivatedRoute, private _service: SharedService, private router: Router, private modal: NgbModal) {
    this.GetAllTasksList();
    this.GetAllUsersList();
    this.GetAllProjectList();
    this.GetAllParentTasksList();
    if (this.route.snapshot.params["id"]) {
      this.id = this.route.snapshot.params["id"];
    }

  }


  ngOnInit() {
    this.GetAllTasksList();
    this.GetAllUsersList();
    this.GetAllProjectList();
    this.GetAllParentTasksList();
    if (this.id !== undefined) {
      this.onEdit(this.id);
    }
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

  onEdit(id: number) {
    this._service.GetById(this.id).subscribe(res => {
      this.regTask = res;
      this.regTask.ProjectName = this.GetProject(this.regTask.ProjectID);
      this.regTask.ParentTaskName = this.GetParentTask(this.regTask.ParentTaskId);
      this.regTask.StartDate = new Date(this.regTask.StartDate).toISOString().split("T")[0];
      this.regTask.EndDate = new Date(this.regTask.EndDate).toISOString().split("T")[0];
      this.regTask.PriorityVal = this.regTask.Priority;
      this.regTask.UserName = this.GetUser(this.regTask.UserID);
    });

  }

  onSave() {
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

  
  SaveTasks()
  {
    this.item = new Tasks();
    this.item.TaskId = this.regTask.TaskId;
    this.item.TaskName = this.regTask.TaskName;
    this.item.ProjectID = this.regTask.ProjectID;
    this.item.Priority = this.regTask.Priority;
    this.item.ParentTaskId = this.regTask.ParentTaskId;
    this.item.StartDate = this.regTask.StartDate;
    this.item.EndDate = this.regTask.EndDate;
    this.item.UserID = this.regTask.UserID;
   
      this._service.UpdateTask(this.item.TaskId,this.item)
        .subscribe(p => {
          this.GetAllTasksList();
          this.form.resetForm();
          this.show = true;
          this.sMessage = "Task Details Updated Successfully...";
          this.ClearForm();
       });
  }



  onCancel() {
    this.form.resetForm();
    this.router.navigate(['viewtask']);
  }

  OpenUserModal() {
    const modalRef = this.modal.open(UserListModalComponent);
    modalRef.result.then((result) => {
      this.regUser = result;
      this.regTask.UserName = this.regUser.FirstName;
      this.regTask.UserID = this.regUser.UserID;
    }).catch((error) => {
      alert(error);
    });
  }

  
  showVal() {
    this.regTask.PriorityVal = this.regTask.Priority;
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


  ClearForm() {
    this.regTask.TaskId = "";
    this.regTask.ProjectName = "";
    this.regTask.TaskName = "";
    this.regTask.Priority=1;
    this.regTask.StartDate="";
    this.regTask.EndDate="";
    
    this.regTask.ParentTaskName = "";
    this.regTask.UserName = "";
    this.regTask.ProjectID = "";
    this.regTask.UserID = "";
    this.regTask.ParentTaskId = "";
  }


}

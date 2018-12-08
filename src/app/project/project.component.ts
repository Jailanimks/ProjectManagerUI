import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../Model/projects';
import { Users } from '../Model/users';
import { Tasks } from '../Model/tasks';
import { SharedService } from '../Services/shared.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserListModalComponent } from '../user-list-modal/user-list-modal.component';
import { ProjectTasks } from '../Model/project-tasks';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  @ViewChild('f') form: any;
  public show: boolean = false;
  public showerror: boolean = false;
  public startdtSortasc: boolean = false;
  public enddtSortasc: boolean = false;
  public prioritySortasc: boolean = false;
  public empidSortasc: boolean = false;
  public compSortasc: boolean = false;
  ManagerName: string;
  public p:number;

  projectlist: Projects[];
  userlist: Users[];
  tasklist: ProjectTasks[];
  acttasklist: Tasks[];
  regProject: any = {};
  item: Projects;
  projectTask: ProjectTasks;
  SusProject: Projects;
  obj: any;
  sMessage: string;
  eMessage: string;
  prjName: string;
  submitType: string = 'Save';
  selectedRow: number;
  isDate: boolean = false;
  public enabledate: boolean = true;
  edate: Date;
  regUser: any = {};

  constructor(private _service: SharedService, private router: Router, private modal: NgbModal) {
    this.GetAllProjectList();
    this.GetAllUsersList();
    this.GetAllTasksList();
    this.GetActiveTasksList();
    this.InitializePriority();
  }

  ngOnInit() {
    this.GetAllProjectList();
    this.GetAllUsersList();
    this.GetAllTasksList();
    this.GetActiveTasksList();
    this.InitializePriority();
  }


  GetAllProjectList() {
    this._service.GetAllProjects()
      .subscribe(p => this.projectlist = p)
  }

  GetAllUsersList() {
    this._service.GetAllUsers()
      .subscribe(p => this.userlist = p)
  }

  GetAllTasksList() {
    this._service.GetProjectTasks()
      .subscribe(p => this.tasklist = p)
  }

  GetActiveTasksList() {
    this._service.GetAllTasks()
      .subscribe(p => this.acttasklist = p)
  }


  onSave() {

    if (new Date(this.regProject.EndDate) < new Date(this.regProject.StartDate)) {
      this.showerror = true;
      this.eMessage = '* End Date cannot before start date';
      return;
    }
    else {
      this.showerror = false;
      this.eMessage = "";
    }

    if (this.form.valid) {

      this.item = new Projects();
      this.item.ProjectName = this.regProject.ProjectName;
      if (this.isDate) {
        this.item.StartDate = this.regProject.StartDate;
        this.item.EndDate = this.regProject.EndDate;
      }
      this.item.Priority = this.regProject.Priority;
      this.item.ManagerID = this.regProject.ManagerID;

      if (this.submitType === 'Save') {
        this._service.AddProject(this.item)
          .subscribe(p => {
            this.GetAllProjectList();
            this.form.resetForm();
            this.show = true;
            this.sMessage = "Project Details added Successfully...";
            this.ClearForm();
          });

      }
      else {
        this.item.ProjectID = this.regProject.ProjectID;
        this._service.UpdateProject(this.item.ProjectID, this.item)
          .subscribe(p => {
            this.GetAllProjectList();
            this.form.resetForm();
            this.show = true;
            this.sMessage = "Project Details Updated Successfully...";
            this.ClearForm();
            this.InitializePriority();
          });

      }
    }

  }





  onEdit(id: number) {

    this.regProject = new Projects();
    this.regProject = Object.assign({}, this.projectlist.find(x => x.ProjectID === id));

    if (this.regProject.StartDate !== null && this.regProject.EndDate !== null) {
      this.enabledate = false;
      this.isDate = true;
      this.regProject.StartDate = new Date(this.regProject.StartDate).toISOString().split("T")[0];
      this.regProject.EndDate = new Date(this.regProject.EndDate).toISOString().split("T")[0];
    }
    else {
      this.enabledate = true;
      this.isDate = false;
    }
    this.regProject.PriorityVal = this.regProject.Priority;
    this.regProject.ManagerName = this.GetManagerName(this.regProject.ManagerID);
    this.submitType = 'Update';
  }



  onSuspend(id: number) {

    if (confirm('Are you sure to Suspend this Project ?') == true) {
      if ((this.acttasklist.filter(x => x.ProjectID == id && x.Status == false).length > 0)) {
        this.showerror = true;
        this.eMessage = '* This Project Associated with Acive Tasks. Project Cannot be Suspended...';
        return;
      }
      else {
        this.showerror = false;
        this.eMessage = "";
      }

      this.SusProject = this.projectlist.find(x => x.ProjectID === id);
      if (this.SusProject !== undefined) {
        this.SusProject.Suspended = true;
        this._service.UpdateProject(id, this.SusProject)
          .subscribe(() => {
            this.GetAllProjectList();
            alert('Project Suspended Successfully...');
          });
      }

    }
  }



  ClearForm() {
    this.submitType = 'Save';
    this.regProject.ProjectID = "";
    this.regProject.ProjectName = "";
    this.regProject.StartDate = "";
    this.regProject.EndDate = "";
    this.regProject.Priority = 3;
    this.regProject.ManagerID = "";
    this.regProject.ManagerName = ""
  }


  onCancel() {
    this.form.resetForm();
    this.ClearForm();
    this.InitializePriority();
    this.sMessage = "";
    this.show = false;
    this.showerror = false;
    this.eMessage = "";
    
  }


  OnEnableDate() {
    if (this.isDate) {

      this.edate = new Date();
      this.edate.setDate(this.edate.getDate() + 1);
      this.enabledate = false;
      this.regProject.StartDate = new Date().toISOString().split("T")[0];
      this.regProject.EndDate = this.edate.toISOString().split("T")[0];
    }
    else {
      this.enabledate = true;
      this.regProject.StartDate = "";
      this.regProject.EndDate = "";
    }
  }


  GetManagerName(id) {
    this.regUser = this.userlist.find(x => x.UserID === id);
    if (this.regUser !== undefined) {
      return this.regUser.FirstName;
    }
  }


  GetAallTasks(id) {

    this.projectTask = this.tasklist.find(x => x.ProjectID === id);
    if (this.projectTask !== undefined) {
      return this.projectTask.TotalTask;
    }
    else
      return 0;

  }

  GetCompletedTasks(id) {
    this.projectTask = this.tasklist.find(x => x.ProjectID === id);
    if (this.projectTask !== undefined) {
      return this.projectTask.CompTask;
    }
    else
      return 0;
  }


  sortByStartDate() {
    if (!this.startdtSortasc) {
      this.projectlist.sort((a, b) => a.StartDate !== null && b.StartDate !== null && a.StartDate.toString().localeCompare(b.StartDate.toString()));
      this.startdtSortasc = true;
    }
    else {
      this.projectlist.sort((a, b) => a.StartDate !== null && b.StartDate !== null && b.StartDate.toString().localeCompare(a.StartDate.toString()));
      this.startdtSortasc = false;
    }

  }


  sortByEndDate() {
    if (!this.enddtSortasc) {
      this.projectlist.sort((a, b) => a.EndDate !== null && b.EndDate !== null && a.EndDate.toString().localeCompare(b.EndDate.toString()));
      this.enddtSortasc = true;
    }
    else {
      this.projectlist.sort((a, b) => b.EndDate !== null && a.EndDate !== null && b.EndDate.toString().localeCompare(a.EndDate.toString()));
      this.enddtSortasc = false;
    }

  }


  sortByPriority() {
    if (!this.prioritySortasc) {
      this.projectlist.sort((a, b) => a.Priority.toString().localeCompare(b.Priority.toString()));
      this.prioritySortasc = true;
    }
    else {
      this.projectlist.sort((a, b) => b.Priority.toString().localeCompare(a.Priority.toString()));
      this.prioritySortasc = false;
    }

  }


  sortByCompleted() {
    if (!this.compSortasc) {
      this.projectlist.sort((a, b) => a.Suspended.toString().localeCompare(b.Suspended.toString()));
      this.compSortasc = true;
    }
    else {
      this.projectlist.sort((a, b) => b.Suspended.toString().localeCompare(a.Suspended.toString()));
      this.compSortasc = false;
    }

  }

  compareTwoDates() {
    if (new Date(this.regProject.EndDate) < new Date(this.regProject.StartDate)) {
      this.sMessage = 'End Date cannot before start date';
      return;
    }
    else {
      this.sMessage = "";
    }
  }


  OpenUserModal() {
    const modalRef = this.modal.open(UserListModalComponent);
    modalRef.result.then((result) => {
      this.regUser = result;
      this.regProject.ManagerName = this.regUser.FirstName;
      this.regProject.ManagerID = this.regUser.UserID;
    }).catch((error) => {
      alert(error);
    });
  }


  SearchByName() {
    if (this.prjName.length > 0) {
      this.projectlist = this.projectlist.filter(i => {
        return i.ProjectName.startsWith(this.prjName)
      });
    }
    else {
      this.GetAllProjectList();
    }
  }

  showVal() {
    this.regProject.PriorityVal = this.regProject.Priority;
  }

  InitializePriority() {
    this.regProject.Priority = 0;
    this.regProject.PriorityVal = this.regProject.Priority;
  }

}

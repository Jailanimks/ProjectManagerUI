import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Projects } from '../Model/projects';
import { Users } from '../Model/users';
import { Tasks } from '../Model/tasks';
import { SharedService } from '../Services/shared.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  @ViewChild('f') form: any;
  public show: boolean = false;
  public showerror: boolean = false;
  public fnameSortasc: boolean = false;
  public lnameSortasc: boolean = false;
  public empidSortasc: boolean = false;

  userlist: Users[];
  projectlist: Projects[];
  tasklist: Tasks[];
  regUser: any = {};
  item: Users;
  obj: any;
  sMessage: string;
  eMessage: string;
  fstName: string;
  submitType: string = 'Save';
  selectedRow: number;

  constructor(private _service: SharedService, private router: Router) {
    this.GetAllUsersList();
    this.GetAllProjectList();
    this.GetAllTasksList();
  }

  ngOnInit() {
    this.GetAllUsersList();
    this.GetAllProjectList();
    this.GetAllTasksList();
  }


  onNew() {
    this.submitType = 'Save';
  }

  GetAllUsersList() {
    this._service.GetAllUsers()
      .subscribe(p => this.userlist = p)
  }

  GetAllProjectList() {
    this._service.GetAllProjects()
      .subscribe(p => this.projectlist = p)
  }

  GetAllTasksList() {
    this._service.GetAllTasks()
      .subscribe(p => this.tasklist = p)
  }

  // Method to Save Users  
  onSave() {

    if (this.form.valid) {

      this.item = new Users();
      this.item.FirstName = this.regUser.FirstName;
      this.item.LastName = this.regUser.LastName;
      this.item.EmployeeId = this.regUser.EmployeeId;

      if (this.submitType === 'Save') {
        this._service.AddUser(this.item)
          .subscribe(p => {
            this.GetAllUsersList();
            this.form.resetForm();
            this.show = true;
            this.sMessage = "User Details added Successfully...";
            this.ClearForm();
          });

      }
      else {
        this.item.UserID = this.regUser.UserID;
        this._service.UpdateUser(this.item.UserID, this.item)
          .subscribe(p => {
            this.GetAllUsersList();
            this.form.resetForm();
            this.show = true;
            this.sMessage = "User Details Updated Successfully...";
            this.ClearForm();
          });

      }
    }

  }


  // Method to Edit Users

  onEdit(id: number) {
    this.regUser = new Users();
    this.regUser = Object.assign({}, this.userlist.find(x => x.UserID === id));

    this.submitType = 'Update';
  }


  // Method to Delete Users
  onDelete(id: number) {

    if (confirm('Are you sure to delete this User ?') == true) {
      if ((this.projectlist.filter(x => x.ManagerID == id).length > 0) || (this.tasklist.filter(a => a.UserID == id).length > 0)) {
        this.showerror = true;
        this.eMessage = '* User Associated with Projects and Tasks. User Cannot be deleted...';
        return;
      }
      else {
        this.showerror = false;
        this.eMessage = "";
      }

      this._service.DeleteUser(id)
        .subscribe(() => {
          this.GetAllUsersList();
          alert('User Deleted Successfully...');
        });

    }

  }



  onCancel() {

    this.ClearForm();
    this.sMessage = "";
    this.show = false;
    this.showerror = false;
    this.eMessage = "";
    this.form.resetForm();
  }



  ClearForm() {
    this.submitType = 'Save';
    this.regUser.UserID = "";
    this.regUser.FirstName = "";
    this.regUser.LastName = "";
    this.regUser.EmployeeId = "";
  }

  // Method for Sorting

  sortByFirstName() {
    if (!this.fnameSortasc) {
      this.userlist.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
      this.fnameSortasc = true;
    }
    else {
      this.userlist.sort((a, b) => b.FirstName.localeCompare(a.FirstName));
      this.fnameSortasc = false;
    }

  }


  sortByLastName() {
    if (!this.lnameSortasc) {
      this.userlist.sort((a, b) => a.LastName.localeCompare(b.LastName));
      this.lnameSortasc = true;
    }
    else {
      this.userlist.sort((a, b) => b.LastName.localeCompare(a.LastName));
      this.lnameSortasc = false;
    }
  }


  sortByEmpid() {
    if (!this.empidSortasc) {
      this.userlist.sort((a, b) => a.EmployeeId.localeCompare(b.EmployeeId));
      this.empidSortasc = true;
    }
    else {
      this.userlist.sort((a, b) => b.EmployeeId.localeCompare(a.EmployeeId));
      this.empidSortasc = false;
    }
  }


  //Method for Search

  SearchByName() {
    if (this.fstName.length > 0) {
      this.userlist = this.userlist.filter(i => {
        return i.FirstName.startsWith(this.fstName)
      });
    }
    else {
      this.GetAllUsersList();
    }
  }



}

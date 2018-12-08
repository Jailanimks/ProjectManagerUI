import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../Services/shared.service';
import { Projects } from '../Model/projects';
import { Users } from '../Model/users';

@Component({
  selector: 'app-project-list-modal',
  templateUrl: './project-list-modal.component.html',
  styleUrls: ['./project-list-modal.component.css']
})
export class ProjectListModalComponent implements OnInit {

  projectlist: Projects[];
  userlist: Users[];
  regProject: any = {};
  regUser: any = {};
  selectedRow: number;
  prjName: string;

  constructor( public activeModal: NgbActiveModal,private _service: SharedService) {

    this.GetAllProjectList();
    this.GetAllUsersList();

   }

  ngOnInit() {
    this.GetAllProjectList();
    this.GetAllUsersList();
  }


  GetAllProjectList() {
    this._service.GetAllProjects()
      .subscribe(p => this.projectlist = p)
  }

  GetAllUsersList() {
    this._service.GetAllUsers()
      .subscribe(p => this.userlist = p)
  }

  GetUser(id) {
    this.regUser = this.userlist.find(x => x.UserID === id);
    if (this.regUser !== undefined) {
      return this.regUser.FirstName;
    }
  }

  onSelect(index: number)
  {
    this.selectedRow = index;
    this.regProject = new Projects();
    this.regProject = Object.assign({}, this.projectlist[this.selectedRow]);
    this.activeModal.close(this.regProject);
  }


  SearchByName() {
    if (this.prjName.length > 0) {
      this.projectlist = this.projectlist.filter(i => {
        return i.ProjectName.startsWith(this.prjName) });
    }
    else {
      this.GetAllProjectList();
    }
  }

}

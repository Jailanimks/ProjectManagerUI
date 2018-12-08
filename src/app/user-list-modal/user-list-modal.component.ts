import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../Services/shared.service';
import { Users } from '../Model/users';

@Component({
  selector: 'app-user-list-modal',
 
  templateUrl: './user-list-modal.component.html',
  styleUrls: ['./user-list-modal.component.css']


})
export class UserListModalComponent implements OnInit {

  userlist: Users[];
  regUser: any = {};
  selectedRow: number;
  fstName: string;

  constructor( public activeModal: NgbActiveModal,private _service: SharedService) { 
    this.GetAllUsersList();
  }

  ngOnInit() {
    this.GetAllUsersList();
  }


  GetAllUsersList() {
    this._service.GetAllUsers()
      .subscribe(p => this.userlist = p)
  }

  onSelect(index: number)
  {
    this.selectedRow = index;
    this.regUser = new Users();
    this.regUser = Object.assign({}, this.userlist[this.selectedRow]);
    this.activeModal.close(this.regUser);
  }


  SearchByName() {
    if (this.fstName.length > 0) {
      this.userlist = this.userlist.filter(i => {
        return i.FirstName.startsWith(this.fstName) });
    }
    else {
      this.GetAllUsersList();
    }
  }
}

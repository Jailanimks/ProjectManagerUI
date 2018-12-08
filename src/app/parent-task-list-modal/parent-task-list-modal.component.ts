import { Component, OnInit } from '@angular/core';
import {ViewChild, ElementRef} from "@angular/core";
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../Services/shared.service';
import { ParentTasks } from '../Model/parent-tasks';

@Component({
  selector: 'app-parent-task-list-modal',
  templateUrl: './parent-task-list-modal.component.html',
  styleUrls: ['./parent-task-list-modal.component.css']
})
export class ParentTaskListModalComponent implements OnInit {

  tasklist: ParentTasks[];
  regTask: any = {};
  selectedRow: number;
  taskName: string;
  projectId:number;

  constructor(public activeModal: NgbActiveModal,private _service: SharedService) { 

    // this.GetAllTaskList();
  }

  ngOnInit() {
    this.GetAllTaskList();
  }


  
  GetAllTaskList() {
    this._service.GetAllParentTasks()
    .subscribe(p => this.tasklist = p.filter(x=> x.ProjectID == this.projectId))
   }

  onSelect(id: number)
  {
    this.regTask = new ParentTasks();
    this.regTask = Object.assign({}, this.tasklist.find(x => x.ParentTaskId === id));
    this.activeModal.close(this.regTask);
  }

  SearchByName() {
    if (this.taskName.length > 0) {
      this.tasklist = this.tasklist.filter(i => {
        return i.ParentTaskName.startsWith(this.taskName) });
    }
    else {
     this.GetAllTaskList();
    }
  }


}

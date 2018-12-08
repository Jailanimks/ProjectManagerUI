import { Injectable } from '@angular/core';
import { Users } from '../Model/Users';
import {Http,Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { Projects } from '../Model/projects';
import { ParentTasks } from '../Model/parent-tasks';
import { ProjectTasks } from '../Model/project-tasks';
import { Tasks } from '../Model/tasks';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  
  public userUrl:string='http://localhost:5354/api/User/';
  public projectUrl:string='http://localhost:5354/api/Project/';
  public ptaskUrl:string='http://localhost:5354/api/ParentTask/';
  public taskUrl:string='http://localhost:5354/api/Task/';

  constructor(private _http:Http) { }

  // User Management

  GetAllUsers():Observable<Users[]>
  {
   // alert(this.url);
     return this._http.get(this.userUrl + 'GetUsers')
     .map((response:Response)=><Users[]>response.json());
   }


   GetByUserId(tid:number):Observable<Users>
   {
     return this._http.get(this.userUrl+"GetUserById/"+tid)
     .map((response:Response)=><Users>response.json())
   }


  AddUser(item:Users):Observable<any>
  {
   
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this._http.post(this.userUrl + 'SaveUser',body,requestOptions)
    .map((r:Response)=><any>r.json())
  }

  UpdateUser(id:number, item:Users):Observable<any>
  {
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Put, headers:headerOptions});
    return this._http.put(this.userUrl + 'EditUser/'+ id ,body,requestOptions)
    .map((r:Response)=><any>r.json())
  }

  DeleteUser(tid:number):Observable<any>
  {
   return this._http.delete(this.userUrl+"DeleteUser/"+tid)
    .map((r:Response)=><any>r.json())
  }

  // User Management

  // Project Management


  GetAllProjects():Observable<Projects[]>
  {
   // alert(this.url);
     return this._http.get(this.projectUrl + 'GetProjects')
     .map((response:Response)=><Projects[]>response.json());
   }

   
   GetByProjectId(tid:number):Observable<Projects>
   {
     return this._http.get(this.projectUrl+"GetProjectById/"+tid)
     .map((response:Response)=><Projects>response.json())
   }


  AddProject(item:Projects):Observable<any>
  {
   
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this._http.post(this.projectUrl + 'SaveProject',body,requestOptions)
    .map((r:Response)=><any>r.json())
  }

  UpdateProject(id:number, item:Projects):Observable<any>
  {
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Put, headers:headerOptions});
    return this._http.put(this.projectUrl + 'EditProject/'+ id ,body,requestOptions)
    .map((r:Response)=><any>r.json())
  }


  // Project Management


  // Parent Task Management

  GetAllParentTasks():Observable<ParentTasks[]>
  {
   // alert(this.url);
     return this._http.get(this.ptaskUrl + 'GetParentTasks')
     .map((response:Response)=><ParentTasks[]>response.json());
   }


   GetByParentId(tid:number):Observable<ParentTasks>
   {
     return this._http.get(this.ptaskUrl+"GetParentTaskById/"+tid)
     .map((response:Response)=><ParentTasks>response.json())
   }


  AddParentTask(item:ParentTasks):Observable<any>
  {
   
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this._http.post(this.ptaskUrl + 'SaveParentTask',body,requestOptions)
    .map((r:Response)=><any>r.json())
  }

  UpdateParentTask(id:number, item:ParentTasks):Observable<any>
  {
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Put, headers:headerOptions});
    return this._http.put(this.ptaskUrl + 'EditParentTask/'+ id ,body,requestOptions)
    .map((r:Response)=><any>r.json())
  }


  // Parent Task Management



  // Task Management

  GetAllTasks():Observable<Tasks[]>
  {
   // alert(this.url);
     return this._http.get(this.taskUrl + 'GetTasks')
     .map((response:Response)=><Tasks[]>response.json());
   }


  GetById(tid:number):Observable<Tasks>
  {
    return this._http.get(this.taskUrl+"GetTaskById/"+tid)
    .map((response:Response)=><Tasks>response.json())
  }
   
  AddTask(item:Tasks):Observable<any>
  {
   
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Post, headers:headerOptions});
    return this._http.post(this.taskUrl + 'SaveTask',body,requestOptions)
    .map((r:Response)=><any>r.json())
  }

  UpdateTask(id:number, item:Tasks):Observable<any>
  {
    var body = JSON.stringify(item);
    var headerOptions = new Headers({ 'Content-Type':'application/json'});
    var requestOptions = new RequestOptions({method:RequestMethod.Put, headers:headerOptions});
    return this._http.put(this.taskUrl + 'EditTask/'+ id ,body,requestOptions)
    .map((r:Response)=><any>r.json())
  }

  GetProjectTasks():Observable<ProjectTasks[]>
  {
    return this._http.get(this.taskUrl + 'GetProjectTasks' )
    .map((response:Response)=><ProjectTasks[]>response.json());
  }

  // Task Management


}

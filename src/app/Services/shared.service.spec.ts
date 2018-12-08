import { SharedService } from './shared.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { TestBed, getTestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Users } from '../Model/users';
import { Projects } from '../Model/projects';
import { ParentTasks } from '../Model/parent-tasks';
import { Tasks } from '../Model/tasks';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('Project Manager Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpModule],
      providers: [SharedService]
    });
  });
  
  it('should be created', inject([SharedService], (service: SharedService) => {
    expect(service.GetAllUsers()).toBeTruthy();
  }));
});



describe('Project Manager Service', () => {
  let injector;
  let service: SharedService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpModule],
      providers: [SharedService]
    });

    injector = getTestBed();
    service = injector.get(SharedService);
    httpMock = injector.get(HttpTestingController);
  });


  // Test Script for User Management

  it('should get all Users', () => {

    const user = {
      UserID: 1,
      FirstName: 'Jailani',
      LastName:'MKS',
      EmployeeId:'CT20850'
    };

    service.GetAllUsers().subscribe(users => {
      expect(users[0].UserID).toBe(user.UserID);
      expect(users[0].EmployeeId).toEqual(user.EmployeeId);
     });
 
  });


  it('should fetch a single user entry by a Userid', () => {

    const user = {
      UserID: 1,
      FirstName: 'Jailani',
      LastName:'MKS',
      EmployeeId:'CT20850'
    };

    service.GetByUserId(1).subscribe(users => {
      expect(users.UserID).toBe(user.UserID);
      expect(users.FirstName).toEqual(user.FirstName);
    
    });
   
  });




  it('should insert new user entry', () => {

    const user = {
      UserID: 1,
      FirstName: 'Jailani',
      LastName:'MKS',
      EmployeeId:'CT20850'
    };

        let data: Users = new Users();
    
        data.FirstName ='Raja';
        data.LastName = 'K'
        data.EmployeeId = 'CT60000';
     
    service.AddUser(data).subscribe( p =>
      service.GetAllUsers().subscribe(
                (data) => {
                  expect(data[data.length-1].FirstName).toEqual('Raja');
                  expect(data[data.length-1].LastName).toEqual('K');
                  expect(data[data.length-1].EmployeeId).toEqual('CT60000');
              }));
     
    });




    it('should save updates to an existing User entry', () => {

      const user = {
        UserID: 1,
        FirstName: 'Jailani',
        LastName:'MKS',
        EmployeeId:'CT20850'
      };

          let data: Users = new Users();
           data.UserID = 2;
           data.FirstName ='KarthikVelan';
           data.LastName = 'N'
           data.EmployeeId = 'CT70000';

      service.UpdateUser(data.UserID,data).subscribe( p =>
        service.GetByUserId(2).subscribe(users => {
                 expect(users.UserID).toBe(data.UserID);
                 expect(users.FirstName).toEqual(data.FirstName);
                 expect(users.EmployeeId).toEqual(data.EmployeeId);
                }));
       
      });



      it('should delete an existing User entry', () => {
        service.DeleteUser(2013).subscribe( p =>
          service.GetByUserId(2013).subscribe(users => {
                  expect(users).toBeUndefined();
                  }));
         
        });




        // Test Script for Project Management

  it('should get all Projects', () => {

    const cproject = {
      ProjectID: 1,
      ProjectName: 'Tracker',
      StartDate:'10/01/2018',
      EndDate:'30/12/2018',
      Priority:5,
      ManagerID:1,
      Suspended:false
    };

    service.GetAllProjects().subscribe(project => {
      expect(project[0].ProjectID).toBe(cproject.ProjectID);
      expect(project[0].ProjectName).toEqual(cproject.ProjectName);
     });
 
  });



  it('should fetch a single Project entry by a Projectid', () => {

    const cproject = {
      ProjectID: 1,
      ProjectName: 'Tracker',
      StartDate:'10/01/2018',
      EndDate:'30/12/2018',
      Priority:5,
      ManagerID:1,
      Suspended:false
    };


    service.GetByProjectId(1).subscribe(project => {
      expect(project.ProjectID).toBe(cproject.ProjectID);
      expect(project.ProjectName).toEqual(cproject.ProjectName);
    
    });
   
  });




  it('should insert new Project entry', () => {

    const cproject = {
      ProjectID: 1,
      ProjectName: 'Tracker',
      StartDate:'10/01/2018',
      EndDate:'30/12/2018',
      Priority:5,
      ManagerID:1,
      Suspended:false
    };

        let data: Projects = new Projects()
    
        data.ProjectName ='Health Check Monitor';
        data.StartDate = new Date('9/21/2018');
        data.EndDate = new Date('02/15/2019');
        data.Priority = 10;
        data.ManagerID = 1;
        data.Suspended = false;

    service.AddProject(data).subscribe( p =>
      service.GetAllProjects().subscribe(
                (data) => {
                  expect(data[data.length-1].ProjectName).toEqual('Health Check Monitor');
                  expect(data[data.length-1].Priority).toEqual(10);
                  expect(data[data.length-1].ManagerID).toEqual(1);
              }));
     
    });




    it('should save updates to an existing Project entry', () => {

      const cproject = {
        ProjectID: 1,
        ProjectName: 'Tracker',
        StartDate:'10/01/2018',
        EndDate:'30/12/2018',
        Priority:5,
        ManagerID:1,
        Suspended:false
      };

          let data: Projects = new Projects();
           data.ProjectID = 2;
           data.ProjectName ='LM System';
           data.StartDate = new Date('12/10/2018');
           data.EndDate = new Date('30/01/2019');
           data.Priority = 15;
           data.ManagerID = 2;
           data.Suspended = false;

      service.UpdateProject(data.ProjectID,data).subscribe( p =>
        service.GetByProjectId(2).subscribe(project => {
                 expect(project.ProjectID).toBe(data.ProjectID);
                 expect(project.Priority).toEqual(data.Priority);
                 expect(project.ProjectName).toEqual(data.ProjectName);
                }));
       
      });





        // Test Script for Parent Task Management

  it('should get all Parent Tasks', () => {

    const cparent = {
      ParentTaskId: 1,
      ParentTaskName: 'Requirement',
      ProjectID: 1
      };

    service.GetAllParentTasks().subscribe(parent => {
      expect(parent[0].ParentTaskId).toBe(cparent.ParentTaskId);
      expect(parent[0].ParentTaskName).toEqual(cparent.ParentTaskName);
     });
 
  });



  it('should fetch a single Parent Task entry by a Taskid', () => {

    const cparent = {
      ParentTaskId: 1,
      ParentTaskName: 'Requirement',
      ProjectID: 1
      };

    service.GetByParentId(1).subscribe(parent => {
      expect(parent.ParentTaskId).toBe(cparent.ParentTaskId);
      expect(parent.ParentTaskName).toEqual(cparent.ParentTaskName);
    
    });
   
  });




  it('should insert new Parent Task entry', () => {

    const cparent = {
      ParentTaskId: 1,
      ParentTaskName: 'Requirement',
      ProjectID: 1
      };

        let data: ParentTasks = new ParentTasks();
    
        data.ParentTaskName ='Release';
        data.ProjectID = 1;
        
    service.AddParentTask(data).subscribe( p =>
      service.GetAllParentTasks().subscribe((data) => {
                  expect(data[data.length-1].ParentTaskName).toEqual('Release');
                  expect(data[data.length-1].ProjectID).toEqual(1);
              }));
     
    });




    it('should save updates to an existing Parent Task entry', () => {

      const cparent = {
        ParentTaskId: 1,
        ParentTaskName: 'Requirement',
        ProjectID: 1
        };


          let data: ParentTasks = new ParentTasks();
           data.ParentTaskId = 2;
           data.ParentTaskName ='Technical Analysis';
           data.ProjectID = 1;

      service.UpdateParentTask(data.ParentTaskId,data).subscribe( p =>
        service.GetByParentId(2).subscribe(parent => {
                 expect(parent.ParentTaskId).toBe(data.ParentTaskId);
                 expect(parent.ParentTaskName).toEqual(data.ParentTaskName);
                }));
       
      });



      // Test Script for Task Management



    it('should get all Tasks', () => {

      const task = {
            TaskId : 1,
            TaskName: 'Requirement',
            ParentTaskId: 1,
            StartDate: '1/5/2018',
            EndDate: '4/7/2018',
            ProjectID :1,
            Priority: 5,
            Status: false,
            UserID: 5
          };

      service.GetAllTasks().subscribe(tasks => {
        expect(tasks[0].TaskId).toBe(task.TaskId);
        expect(tasks[0].TaskName).toEqual(task.TaskName);
   
      });
     

    });


    it('should fetch a single task entry by a Taskid', () => {

      const task = {
        TaskId : 1,
        TaskName: 'Requirement',
        ParentTaskId: 1,
        StartDate: '1/5/2018',
        EndDate: '4/7/2018',
        ProjectID :1,
        Priority: 5,
        Status: false,
        UserID: 5
      };

      service.GetById(1).subscribe(tasks => {
        expect(tasks.TaskId).toBe(task.TaskId);
        expect(tasks.TaskName).toEqual(task.TaskName);
      
      });
     
    });



    it('should insert new task entry', () => {

      const task = {
        TaskId : 1,
        TaskName: 'Requirement',
        ParentTaskId: 1,
        StartDate: '1/5/2018',
        EndDate: '4/7/2018',
        ProjectID :1,
        Priority: 5,
        Status: false,
        UserID: 5
      };

          let data: Tasks = new Tasks();
      
          data.TaskName ='Design1';
          data.ParentTaskId = 3;
          data.Priority = 5;
          data.StartDate = new Date('8/25/2018');
          data.EndDate = new Date('9/26/2019');
          data.ProjectID = 1;
          data.Status = false;
          data.UserID = 6;
          

      service.AddTask(data).subscribe( p =>
        service.GetAllTasks().subscribe(
                  (data) => {
                    expect(data[data.length-1].TaskName).toEqual('Design1');
                    expect(data[data.length-1].ParentTaskId).toEqual(3);
                    expect(data[data.length-1].Priority).toEqual(5);
                }));
       
      });
    


      it('should save updates to an existing Task entry', () => {

        const task = {
          TaskId : 1,
          TaskName: 'Requirement',
          ParentTaskId: 1,
          StartDate: '1/5/2018',
          EndDate: '4/7/2018',
          ProjectID :1,
          Priority: 5,
          Status: false,
          UserID: 5
        };
  
            let data: Tasks = new Tasks()
            data.TaskId = 3;
            data.TaskName ='Development';
            data.ParentTaskId = 2;
            data.Priority = 10;
            data.StartDate = new Date('3/10/2018');
            data.EndDate = new Date('10/04/2019');
            data.ProjectID = 2;
            data.Status = false;
            data.UserID = 7;
            
  
        service.UpdateTask(data.TaskId,data).subscribe( p =>
          service.GetById(3).subscribe(tasks => {
                   expect(tasks.TaskId).toBe(task.TaskId);
                   expect(tasks.TaskName).toEqual(task.TaskName);
                   expect(tasks.ParentTaskId).toEqual(task.ParentTaskId);
                   expect(tasks.Priority).toEqual(task.Priority);
                  }));
         
        });
    


});

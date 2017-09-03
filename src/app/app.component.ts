import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TaskService } from './app.service';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Task } from "./task/task.model";
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  message : string;
  tasks: Array<Task>;
  task: Task;
  selectedTask: Task;
  isNewRecord: boolean;
  statusMessage: string;
  
  // Template Ref types
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  constructor(private taskService: TaskService) {
    this.tasks = new Array<Task>();
    this.message = 'HTML DataGrid using Angular 4';
  }

  ngOnInit(): void {
    this.loadTasks()
  }

  private loadTasks() {
    // this
    //   .taskService
    //   .getTasks()
    //   .subscribe((resp: Response) => {
    //     this.tasks = resp.json();
    //   });

    this.tasks = [
      { Id: '1', No: 1, Name: 'Task 1', Salary: 1, DeptName: 'DeptName 1', Designation: 'Designation 1'},
      { Id: '2', No: 2, Name: 'Task 2', Salary: 2, DeptName: 'DeptName 2', Designation: 'Designation 2'},
      { Id: '3', No: 3, Name: 'Task 3', Salary: 3, DeptName: 'DeptName 3', Designation: 'Designation 3'}
    ];  
  }

  
  public addTask() {
    this.selectedTask = new Task('', 0, '', 0, '', '');
    this.tasks.push(this.selectedTask);
  }

  public editTask(task: Task) {
    this.selectedTask = task;
  }

  public saveTask() {
    if (this.isNewRecord) {
      this.taskService.addTask(this.selectedTask).subscribe((responce: Response) => {
        this.task = responce.json(),
        this.statusMessage = 'Record added successfully.',
        this.loadTasks();
      });
      this.isNewRecord = false;
      this.selectedTask = null;
    } else {
      this.taskService.updateTask(this.selectedTask.Id, this.selectedTask).subscribe((responce: Response) => {
        this.statusMessage = 'Record updated successfully',
        this.loadTasks();
      });
      this.selectedTask = null;
    }
  }

  public canced() {
    this.selectedTask = null;
  }

  public deleteTask(task: Task) {
    this.taskService.deleteTask(task.Id).subscribe((response: Response) => {
      this.statusMessage = 'Record deleted successfully',
      this.loadTasks();
    });
  }

  public loadTemplate(task: Task) {
    if (this.selectedTask && this.selectedTask.No === task.No) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
}

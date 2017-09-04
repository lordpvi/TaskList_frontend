import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TaskService, TaskFilter } from './app.service';
import { Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Task } from './task/task.model';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  message: string;
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
    this.loadTasks();
  }

  private loadTasks() {
    this
      .taskService
      .getTasks(new TaskFilter(null, null, null, null, null, null))
      .subscribe((resp: Response) => {
        this.tasks = resp.json();
      });

    // this.tasks = [
    //   { id: 1, number: '1', description: 'Task 1', status: 'NEW', dateEnd: new Date(Date.now()), createTime: new Date(Date.now()) },
    //   { id: 2, number: '2', description: 'Task 2', status: 'NEW', dateEnd: new Date(Date.now()), createTime: new Date(Date.now()) },
    //   { id: 3, number: '3', description: 'Task 3', status: 'NEW', dateEnd: new Date(Date.now()), createTime: new Date(Date.now()) }
    // ];
  }


  public addTask() {
    this.selectedTask = new Task(0, '', '', 'OPEN', new Date(Date.now()), new Date(Date.now()));
    this.tasks.push(this.selectedTask);
    this.isNewRecord = true;
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
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe((responce: Response) => {
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
    this.taskService.deleteTask(task.id).subscribe((response: Response) => {
      this.statusMessage = 'Record deleted successfully',
      this.loadTasks();
    });
  }

  public loadTemplate(task: Task) {
    if (this.selectedTask && this.selectedTask.number === task.number) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }
}

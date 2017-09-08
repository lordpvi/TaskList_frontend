import { NgModule } from '@angular/core';
import { TaskListComponent } from './list/task.list.component';
import { TaskService } from './task.service';


@NgModule({
  declarations: [
    TaskListComponent
  ],
  exports: [TaskListComponent],
  providers: [TaskService]
})
export class TaskModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AppComponent} from './app.component';

// import { TaskModule } from './task/task.module';

@NgModule({
  declarations: [
  ],
  imports: [
    NgModule, BrowserModule, HttpModule, FormsModule//, TaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

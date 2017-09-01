import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {Employee} from './task/employee.model';
import {EmployeeService} from './app.service';
import {Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  // Template Ref types
  @ViewChild('readOnlyTemplate') readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate') editTemplate: TemplateRef<any>;

  message: string;
  employee: Employee;
  selectedEmployee: Employee;
  employees: Array<Employee>;
  isNewRecord: boolean;
  statusMessage: string;

  constructor(private employeeService: EmployeeService) {
    this.employees = new Array<Employee>();
    this.message = 'HTML DataGrid using Angular 4';
  }

  ngOnInit(): void {
    this.loadEmployee();
  }

  private loadEmployee() {
    this
      .employeeService
      .getEmployees()
      .subscribe((resp: Response) => {
        this.employees = resp.json();
      });
  }

  public addEmployee() {
    this.selectedEmployee = new Employee('', 0, '', 0, '', '');
    this.employees.push(this.selectedEmployee);
  }

  public editEmployee(emp: Employee) {
    this.selectedEmployee = emp;
  }

  public saveEmployee() {
    if (this.isNewRecord) {
      this.employeeService.addEmployee(this.selectedEmployee).subscribe((responce: Response) => {
        this.employee = responce.json(),
        this.statusMessage = 'Record added successfully.',
        this.loadEmployee();
      });
      this.isNewRecord = false;
      this.selectedEmployee = null;
    } else {
      this.employeeService.updateEmployee(this.selectedEmployee.Id, this.selectedEmployee).subscribe((responce: Response) => {
        this.statusMessage = 'Record updated successfully',
        this.loadEmployee();
      });
      this.selectedEmployee = null;
    }
  }

  public canced() {
    this.selectedEmployee = null;
  }

  public deleteEmployee(emp: Employee) {
    this.employeeService.deleteEmployee(emp.Id).subscribe((response: Response) => {
      this.statusMessage = 'Record deleted successfully',
      this.loadEmployee();
    });
  }

  public loadTemplate(emp: Employee) {
    if (this.selectedEmployee && this.selectedEmployee.No === emp.No) {
      return this.editEmployee;
    } else {
      return this.readOnlyTemplate;
    }
  }
}

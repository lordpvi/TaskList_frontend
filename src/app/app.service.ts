// import dependences
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Employee} from './task/employee.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

// service class
@Injectable()
export class EmployeeService {
    private baseUrl: string = 'http://localhost:9000/employees';

    constructor(private http: Http) { }

    getEmployees(): Observable<Response> {
        return this.http.get(this.baseUrl);
    }

    addEmployee(emp: Employee): Observable<Response> {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        return this
            .http
            .post(this.baseUrl, JSON.stringify(emp), options);
    }

    updateEmployee(id: string, emp: Employee): Observable<Response> {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        return this
            .http
            .put(this.baseUrl + '/' + id, JSON.stringify(emp), options);
    }

    deleteEmployee(id: string): Observable<Response> {
        return this
            .http
            .delete(this.baseUrl + '/' + id);
    }
}

// import dependences
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Task} from './task/task.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

// service class
@Injectable()
export class TaskService {
    private baseUrl: string = 'http://localhost:9000/tasks';

    constructor(private http: Http) { }

    getTasks(): Observable<Response> {
        return this.http.get(this.baseUrl);
    }

    addTask(task: Task): Observable<Response> {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        return this
            .http
            .post(this.baseUrl, JSON.stringify(task), options);
    }

    updateTask(id: string, task: Task): Observable<Response> {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        return this
            .http
            .put(this.baseUrl + '/' + id, JSON.stringify(task), options);
    }

    deleteTask(id: string): Observable<Response> {
        return this
            .http
            .delete(this.baseUrl + '/' + id);
    }
}

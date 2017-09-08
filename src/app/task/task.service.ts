// import dependences
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Task} from './task.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

// service class
@Injectable()
export class TaskService {
    private baseUrl: string = 'http://localhost:9000/api/v1/task/';

    constructor(private http: Http) { }

    getAllTasks(): Observable<Response> {
        return this.getTasks(new TaskFilter(null, null, null, null, null, null));
    }

    getTasks(filter: TaskFilter): Observable<Response> {
        console.log(filter);
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        return this
            .http
            .post(this.baseUrl + 'find/', JSON.stringify(filter), options);
    }

    addTask(task: Task): Observable<Response> {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        return this
            .http
            .post(this.baseUrl, JSON.stringify(task), options);
    }

    updateTask(id: number, task: Task): Observable<Response> {
        let header = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: header});
        return this
            .http
            .put(this.baseUrl + id, JSON.stringify(task), options);
    }

    deleteTask(id: number): Observable<Response> {
        return this
            .http
            .delete(this.baseUrl + id);
    }
}

export class TaskFilter {
    constructor(
        public dateBegin: Date,
        public dateEnd: Date,
        public page: number,
        public pageSize: number,
        public status: string,
        public orderFiled: string
    ) {}
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiServiceService } from './rest-api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  constructor(public api: RestApiServiceService, public router: Router) { }

  getUserTasks(pageNumber: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.getData('getUserTasks?page=' + pageNumber, '').then((data: any) => {
        observer.next(data);
        observer.complete();
      }, (err) => {
        observer.error();

      });
    })
  }
  updateTaskStatus(task_id: number, status_id: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData('updateTaskStatus', { task_id: task_id, status_id: status_id }).then((data: any) => {
        observer.next(data);
        observer.complete();
      }, (err) => {
        observer.error();

      });
    })
  }
  viewTask(task_id: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.getData("viewTask", { task_id }).then((data: any) => {
        observer.next(data);
        observer.complete();
      }, (err) => {
        observer.error();
      });
    })
  }
}

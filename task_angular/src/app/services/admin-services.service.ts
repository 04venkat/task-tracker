import { Injectable } from '@angular/core';
import { RestApiServiceService } from './rest-api-service.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminServicesService {

  constructor(public api: RestApiServiceService, public router: Router) { }

  getAllTasks(pageNumber: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.getData('getAllTasks?page=' + pageNumber, '').then((data: any) => {
        observer.next(data);
        observer.complete();
      }, (err) => {
        observer.error();

      });
    })
  }

  deleteTask(task_id: number): Observable<any> {
    return new Observable<any>((observer) => {
      this.api.postData('deleteTask', {
        task_id: task_id,
      }).then((res: any) => {
        return observer.next(res.data)
      })
    })
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RestApiServiceService } from './rest-api-service.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationServiceService {
  userData: any = [];
  role_id$ = new BehaviorSubject<any>([]);
  adminAccess = new BehaviorSubject<boolean>(false);

  constructor(public api: RestApiServiceService, public router: Router) { }

  verifyUserCredentials(): Observable<any> {
    return new Observable<boolean>((observer) => {
      if (localStorage.getItem("token") !== null) {
        this.api.getData('getUserDetails', '').then((data: any) => {
          this.userData = data;
          if (data.user.role_id == 2) {
            this.adminAccess.next(true);
          }
          observer.next(data);
          this.role_id$.next(data.user.role_id);
          observer.complete();
        }, (error) => {
          console.error("Error during authentication:", error);
          observer.next(false);
          observer.complete();
        });
      } else {
        localStorage.clear();
        observer.next(false);
        observer.complete();
      }
    });
  }
  getAllMenuItems(): Observable<any> {
    return new Observable<{ status: boolean, message: string, data?: any }>((observer) => {
      this.api.getData('getAllMenuItems', '').then((res: any) => {
        observer.next(res.data);

      })
    })
  }

}

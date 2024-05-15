import { HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestApiServiceService {

  constructor(public http: HttpClient, public router: Router) {
  }
  public getHeaders() {
    let token = localStorage.getItem("token") || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    })
  }
  public postData(endpoint: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.apiUrl + endpoint, data, { headers: this.getHeaders() }).subscribe((res) => {
        resolve(res);
      },
        (error) => {
          if (error.status == 401) {
            this.handleApiError(error);
          } else {
            reject(error);
          }
        }
      );
    });
  }
  public getData(endpoint: string, data: any) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.apiUrl + endpoint, { params: data, headers: this.getHeaders() }).subscribe((res) => {
        resolve(res);
      },
        (error) => {
          if (error.status == 401) {
            this.handleApiError(error);
          } else {
            reject(error);
          }
        }
      );
    });
  }
  public handleApiError(error: HttpErrorResponse) {
    if (error.status == 401) {
      localStorage.removeItem("token");
      this.router.navigate(['/sign_in']);
    }
  }
}

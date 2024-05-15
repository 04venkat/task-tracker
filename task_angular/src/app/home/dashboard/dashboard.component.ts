
import { Component, OnInit } from '@angular/core';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { Router } from '@angular/router';
import { AuthorizationServiceService } from '../../services/authorization-service.service';
import { AdminServicesService } from '../../services/admin-services.service';
import { responseMessage } from '../../common/constant.functions';
import { UserServicesService } from '../../services/user-services.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  role_id: number = 0;
  taskCount: any = [];
  status: any = [];
  loader: boolean = true;
  priority: any = [];
  constructor(public api: RestApiServiceService, public router: Router, public auth: AuthorizationServiceService, public admin: AdminServicesService, public user: UserServicesService) {
  }
  ngOnInit(): void {
    this.auth.verifyUserCredentials().subscribe(res => {
      this.loader = false;
      if (res) {
        this.role_id = res.user.role_id;
      }
      if (this.role_id == 2) {
        //admin dashboard
        this.admin.getAllTasks(1).subscribe((data: any) => {
          this.taskCount = data.taskCount;
          this.status = data.taskCount['status.status_name'];
          this.priority = data.taskCount['priority.priority_level'];

        }), (err: any) => {
          responseMessage('warning', "something went wrong!", true);
          this.router.navigate(['signIn'])
        };
      } else {
        this.user.getUserTasks(1).subscribe((data: any) => {
          this.taskCount = data.taskCount;
          this.status = data.taskCount['status.status_name'];
          this.priority = data.taskCount['priority.priority_level'];

        })
      }
      this.loader = true;

    }), (err: any) => {
      responseMessage('warning', "something went wrong!", true);
      this.router.navigate(['signIn'])
    };
  }

}
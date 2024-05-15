import { responseMessage } from './../../common/constant.functions';
import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { UserServicesService } from '../../services/user-services.service';
import { Tasks } from '../../common/constant.functions';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { AuthorizationServiceService } from '../../services/authorization-service.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent {

  loader: boolean = true;
  task_id: number = 0;
  task: Tasks[] = [];
  role_id: number = 1;
  user_id: number = 0;
  imagePath: string = '../../../assets/images/';
  constructor(private admin: AdminServicesService, private user: UserServicesService, private router: Router, private route: ActivatedRoute, public auth: AuthorizationServiceService) {
    this.route.params.subscribe(params => {
      this.loader = false;
      this.task_id = params['task_id'];
    });
    this.auth.verifyUserCredentials().subscribe(res => {
      if (res) {
        this.role_id = res.user.role_id;
        this.user_id = res.user.id;
        this.viewTask(this.task_id);
      }
    })
    this.loader = true;

  }


  viewTask(task_id: number) {
    this.user.viewTask(task_id).subscribe((res: any) => {
      if (res.data !== "Unauthorized") {
        this.task = res.data;
      } else {
        this.router.navigate([''])
      }
    })
  }
  updateTaskStatus(task_id: number, status_id: number, index: number, status_name: string) {
    this.user.updateTaskStatus(task_id, status_id).subscribe(() => {
      this.task[index].status.id = status_id;
      this.task[index].status.status_name = status_name;
      this.task[index].status_id = status_id;

      responseMessage('success', 'Task Status Updated Successfully', true);
    });
  }

}

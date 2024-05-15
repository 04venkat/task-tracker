import { Component } from '@angular/core';
import { AdminServicesService } from '../../services/admin-services.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Categories, Priority, Tasks, responseMessage } from '../../common/constant.functions';
import { FormsModule } from '@angular/forms';
import { UserServicesService } from '../../services/user-services.service';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { AuthorizationServiceService } from '../../services/authorization-service.service';


@Component({
  selector: 'app-all-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DatePipe],
  templateUrl: './all-tasks.component.html',
  styleUrl: './all-tasks.component.css'
})
export class AllTasksComponent {

  //Common variables
  loader: boolean = false;
  imagePath: string = '../../../assets/images/';

  // Task list data source variables
  allTasks: Tasks[] = [];
  tasks: Tasks[] = [];

  // Search technique  variables
  searchTerm: string = '';
  searchCategory: string = '';
  searchPriority: string = '';
  searchStatus: string = '';
  searchAssignee: string = '';

  //Pagination  variables
  totalPages: any = [];
  pageNumber: number = 1;
  currentPageNumber: number = 1;
  paginationInfo: any = [];

  priority: Priority[] = [];
  categories: Categories[] = [];
  users: any[] = [];
  status: any = [];


  constructor(private admin: AdminServicesService, public auth: AuthorizationServiceService, private user: UserServicesService, public api: RestApiServiceService, public router: Router) {
    auth.verifyUserCredentials().subscribe(res => {
      if (res.user.role_id !== 2) {
        this.router.navigate(['dashboard']);
      } else {
        this.getAllTasks(this.pageNumber);
      }
    });
    api.getData('fetchSelectOptions', '').then((res: any) => {
      this.categories = res.category;
      this.users = res.users;
      this.priority = res.priority;
      this.status = res.status;
    })
  }


  getAllTasks(page: number) {
    this.admin.getAllTasks(page).subscribe((data: any) => {
      this.allTasks = data.data.data;
      this.tasks = this.allTasks;
      this.paginationInfo = data.paginationInfo;
      this.loader = true;
      if (this.searchTerm || this.searchCategory || this.searchPriority || this.searchAssignee || this.searchStatus !== '') {
        this.onSearch();
      }
    })
  }
  deleteTask(post_id: number, index: number) {
    const result = confirm("Are you sure you want to delete this post?");
    if (result) {
      this.admin.deleteTask(post_id).subscribe(() => {
      }, err => {
        console.log(err);
      });
    }
  }
  updateTaskStatus(task_id: number, status_id: number, index: number, status_name: string) {
    this.user.updateTaskStatus(task_id, status_id).subscribe(() => {
      this.tasks[index].status.id = status_id;
      this.tasks[index].status.status_name = status_name;
      this.tasks[index].status_id = status_id;
      responseMessage('success', 'Task Status Updated Successfully', true);
    });
  }
  onSearch() {
    if (this.searchCategory || this.searchPriority || this.searchTerm || this.searchAssignee || this.searchStatus) {
      this.tasks = this.allTasks.filter((item: any) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        // item.description.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        item.priority.priority_level.toLowerCase().includes(this.searchPriority.toLowerCase()) &&
        item.category.category_type.toLowerCase().includes(this.searchCategory.toLowerCase()) &&
        item.user.full_name.toLowerCase().includes(this.searchAssignee.toLowerCase()) &&
        item.status.status_name.toLowerCase().includes(this.searchStatus.toLowerCase()));
    } else {
      this.tasks = this.allTasks;
    }

  }
  changePage(pageNumber: number): void {
    this.getAllTasks(pageNumber);
  }
  getPageNumbers(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  viewTask(task_id: number) {

    this.router.navigate(['view_task', task_id]);
  }

}
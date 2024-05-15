import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Tasks, imagePath } from '../../common/constant.functions';
import { FormsModule } from '@angular/forms';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, RouterOutlet, DatePipe],

  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.css'
})
export class MyTasksComponent {


  // Common variables
  loader: boolean = false;
  imagePath: string = imagePath;
  statusTabActive: string | null = '';

  // Search technique variables
  searchTerm: string = '';
  searchCategory: string = '';
  searchPriority: string = '';
  searchStatus: string | null = '';
  status_id: number = 0;
  //  Array of tasks for display in table
  allTasks: Tasks[] = [];
  tasks: Tasks[] = [];
  taskCountByPriority: any = [];
  totalTaskCount: any = [];
  // Pagination  variables
  totalPages: any = [];
  pageNumber: number = 1;
  paginationInfo: any = [];
  searchedTasks: any = [];
  constructor(private user: UserServicesService, public router: Router) {
    this.getUserTasks(this.pageNumber);
  }


  getUserTasks(page: number) {
    this.user.getUserTasks(page).subscribe((data: any) => {
      this.loader = true;
      this.allTasks = data.data.data;
      this.tasks = [...this.allTasks];
      this.totalTaskCount = data.taskCount.totalTasks;
      this.paginationInfo = data.paginationInfo;
      this.taskCountByPriority = data.taskCount['priority.priority_level'];
      if (this.status_id !== 0) {
        this.onSearch(this.searchStatus, this.status_id);
      }

    })
  }



  onSearch(searchStatus: string | null, status_id: number) {
    this.statusTabActive = searchStatus;
    this.searchStatus = searchStatus;
    this.status_id = status_id;
    console.log(this.status_id)
    if (searchStatus && status_id) {
      this.tasks = this.allTasks.filter((item: any) =>
        item.status.status_name.toLowerCase().includes(searchStatus.toLowerCase()) &&
        item.status.id == status_id
      );
    }
    else {
      this.tasks = this.allTasks;
    }
  }
  searchTasks() {
    if (this.searchTerm || this.searchPriority) {
      if (this.tasks.length <= 1) {
        this.tasks = this.allTasks;
      }
      this.searchedTasks = this.tasks.filter((item: any) =>
        item.title.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        item.priority.priority_level.toLowerCase().includes(this.searchPriority.toLowerCase())
      );
      this.tasks = this.searchedTasks;
    }
    else {
      this.tasks = this.allTasks;
    }
  }

  changePage(pageNumber: number): void {
    this.getUserTasks(pageNumber);
  }

  getPageNumbers(totalPages: number) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  viewTask(task_id: number) {

    this.router.navigate(['view_task', task_id]);
  }

}

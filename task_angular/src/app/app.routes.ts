import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AllTasksComponent } from './home/all-tasks/all-tasks.component';
import { CreateTaskComponent } from './home/create-task/create-task.component';
import { MyTasksComponent } from './home/my-tasks/my-tasks.component';
import { ViewTaskComponent } from './home/view-task/view-task.component';
import { AuthorizationServiceService } from './services/authorization-service.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        data: { pageTitle: 'Home' },
        children: [
            {
                path: 'dashboard',
                title: 'Dashboard',
                component: DashboardComponent,

            },
            {
                path: 'all_tasks',
                title: 'All Tasks',
                component: AllTasksComponent,

            },
            {
                path: 'create_task',
                title: 'Create Task',
                component: CreateTaskComponent,

            },

            {
                path: 'my_tasks',
                title: 'Your works',
                component: MyTasksComponent,
            },
            {
                path: 'view_task/:task_id',
                title: 'View Task',
                component: ViewTaskComponent,
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }
        ]

    },
    {
        path: 'sign_in',
        title: 'SignIn',
        component: SignInComponent
    },
    {
        path: 'sign_up',
        title: 'SignUp',
        component: SignUpComponent
    },
    {
        path: '**',
        title: 'PageNotFound',
        component: PageNotFoundComponent
    }

];

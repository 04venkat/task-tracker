import { Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { Router } from '@angular/router';
import { AuthorizationServiceService } from '../../services/authorization-service.service';
import { InputValidationService } from '../../services/input-validation.service';
import { responseMessage, Categories, Priority } from '../../common/constant.functions';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, AngularEditorModule, NgIf, HeaderComponent],

  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {


  //Create Form  Controls
  form = this.fb.group({
    title: new FormControl(''),
    description: new FormControl(''),
    deadline: new FormControl(''),
    category_id: new FormControl(),
    priority_id: new FormControl(),
    user_id: new FormControl(),
    taskFiles: new FormControl(''),

  });
  selectedFiles: File[] = [];

  // Common variables
  loader = true;
  createTaskLoader: boolean = false;
  isFormSubmitted = false;
  files: FileList | null = null;
  imageUrl: string = '';

  //Error Messages 
  titleErrorMessage: string = '';
  descriptionErrorMessage: string = '';
  taskFilesErrorMessage: string = '';

  // Select Options  for Dropdown Lists
  priority: Priority[] = [];
  categories: Categories[] = [];
  users: any[] = [];

  // Angular Editor
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    width: '100%',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  constructor(public api: RestApiServiceService, private fb: FormBuilder, public router: Router, public auth: AuthorizationServiceService, public validate: InputValidationService) {
    auth.verifyUserCredentials().subscribe(res => {
      if (res.user.role_id !== 2) {
        this.router.navigate(['/dashboard']);
      } else {
        this.loader = false;
      }
    });

    api.getData('fetchSelectOptions', '').then((res: any) => {
      this.categories = res.category;
      this.users = res.users;
      this.priority = res.priority;
    })
  }
  validateDate(deadline: any) {
    const today = new Date();
    const inputDate = new Date(deadline);
    if (inputDate >= today) {
      return true
    } else {
      responseMessage('error', 'Please enter a future date.', true);
      return false;
    }
  }
  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    this.selectedFiles = [];


    for (let i = 0; i < files.length; i++) {
      const file: File | null = files.item(i);
      if (file) {
        this.selectedFiles.push(file);
      }
    }
  }
  createTask() {
    this.createTaskLoader = true;
    this.isFormSubmitted = true;
    console.log(this.form.value);
    const formData = new FormData();
    const deadline = this.form.value['deadline'];

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('image_url[]', this.selectedFiles[i], this.selectedFiles[i].name);
    }
    formData.append('title', this.form.get('title')?.value || '');
    formData.append('description', this.form.get('description')?.value || '');
    formData.append('category_id', this.form.get('category_id')?.value || '');
    formData.append('priority_id', this.form.get('priority_id')?.value || '');
    formData.append('user_id', this.form.get('user_id')?.value || '');
    formData.append('deadline', this.form.get('deadline')?.value || '');



    if (this.form.valid && this.validateDate(deadline)) {
      this.api.postData('createTask', formData).then(
        (response: any) => {
          this.router.navigate([''])
          responseMessage("success", response.message, true);
        },
        error => {
          this.titleErrorMessage = error.error.errors.title;
          this.descriptionErrorMessage = error.error.errors.description;
          this.taskFilesErrorMessage = error.error.errors.image_url;
        },
      ).finally(() => {
        this.createTaskLoader = false;
      })
    } else {
      this.createTaskLoader = false;
    }
  }
}







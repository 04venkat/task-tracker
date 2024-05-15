import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { RestApiServiceService } from '../services/rest-api-service.service';
import { AuthorizationServiceService } from '../services/authorization-service.service';
import { InputValidationService } from '../services/input-validation.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { responseMessage } from '../common/constant.functions';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf, HeaderComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  files: FileList | null = null;
  imageUrl: string = 'https://th.bing.com/th/id/OIP.hmLglIuAaL31MXNFuTGBgAAAAA?rs=1&pid=ImgDetMain';

  form = this.fb.group({
    username: new FormControl('', Validators.required),
    full_name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/)]),
    profile_picture: new FormControl('', Validators.required),
  });
  loader = false;
  isFormSubmitted = false;

  //Error Messages 
  imageError: string = '';
  fullNameErrorMessage: string = '';
  usernameErrorMessage: string = '';
  profileErrorMessage: string = '';

  constructor(public api: RestApiServiceService, private fb: FormBuilder, public router: Router, public auth: AuthorizationServiceService, public validate: InputValidationService) {
    auth.verifyUserCredentials().subscribe(res => {
      if (res) {
        this.router.navigate(['']);
      }
      else {
        this.router.navigate(['sign_up'])
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.files = event.target.files;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result as string;
        this.form.patchValue({ profile_picture: file });
      };
      reader.readAsDataURL(file);
    }
  }

  signUp() {
    this.loader = true;
    this.isFormSubmitted = true;

    const formData = new FormData();
    formData.append('profile_picture', this.form.get('profile_picture')?.value || '');
    formData.append('username', this.form.get('username')?.value || '');
    formData.append('full_name', this.form.get('full_name')?.value || '');
    formData.append('password', this.form.get('password')?.value || '');

    if (this.form.valid) {
      this.api.postData('signUp', formData).then(
        (response: any) => {
          this.router.navigate(['sign_in'])
          responseMessage("success", response.message, false);

        },
        error => {
          this.usernameErrorMessage = error.error.errors.username;
          this.fullNameErrorMessage = error.error.errors.full_name;
          this.profileErrorMessage = error.error.errors.profile_picture;
        },
      ).finally(() => {
        this.loader = false;
      })


    } else {
      this.loader = false;
    }
  }

}

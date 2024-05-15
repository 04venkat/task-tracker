import { Component, OnInit } from '@angular/core';
import { RestApiServiceService } from '../services/rest-api-service.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthorizationServiceService } from '../services/authorization-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuItems: any = [];
  signOutBtnVisibility = false;
  isLoggedIn: boolean = false;
  loader: boolean = false;
  full_name: string = '';
  profile_picture: string = '';
  imagePath: string = '../../../assets/images/';

  constructor(public api: RestApiServiceService, public router: Router, public auth: AuthorizationServiceService) {


  }
  ngOnInit(): void {
    this.auth.verifyUserCredentials().subscribe(res => {
      if (res) {
        this.loader = true;
        this.getMenuItems();

        this.full_name = res.user.full_name;
        this.profile_picture = res.user.profile_picture;
      }
    })

  }

  getMenuItems() {
    this.auth.getAllMenuItems().subscribe(res => {
      if (res) {
        this.menuItems = res;
        this.loader = false;
        this.signOutBtnVisibility = true;
      }
    })
  }

  public signOut() {
    this.api.getData('signOut', '').then(() => {
      this.menuItems = '';
      this.signOutBtnVisibility = false;
      this.router.navigate(['sign_in']);
    })
  }
}
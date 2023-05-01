import { Component } from '@angular/core';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { StoreService } from 'src/shared/services/store.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(public authService: AuthenticationService, public storeService: StoreService) { 

  }

  activeTab: string = 'main';
  onHover: boolean = false;

  toMain() {
    this.activeTab = 'main';
  }
  toProfile() {
    this.activeTab = 'profile';
  }
  toCourses() {
    this.activeTab = 'courses';
  }
  toSignout() {
    this.activeTab = 'main';
    this.signOut();
  }

  signOut() {
    this.authService.signOutUser();
  }

}

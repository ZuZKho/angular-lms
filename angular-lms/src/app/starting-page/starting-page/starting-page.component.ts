import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/services/authentication.service';

@Component({
  selector: 'app-starting-page',
  templateUrl: './starting-page.component.html',
  styleUrls: ['./starting-page.component.scss']
})
export class StartingPageComponent {
  constructor(private router: Router, private authService: AuthenticationService) {}

  toAuth() {
   this.router.navigate(['/auth']);
  }

}

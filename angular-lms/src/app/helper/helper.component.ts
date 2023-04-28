import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { FirebaseService } from 'src/shared/services/firebase.service';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent {

  constructor(public firebaseAuth: AuthenticationService, private router:Router, protected firebaseDatabase: FirebaseService) {  }

  signOut() {
    this.firebaseAuth.signOutUser().subscribe((message) => {
      if (message==='OK') {
        this.router.navigate(['']);
      }
    });  
  }

}

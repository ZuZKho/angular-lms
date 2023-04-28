import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { AuthenticationService } from 'src/shared/services/authentication.service';
import { FirebaseService } from 'src/shared/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(private router: Router,
              private firebaseAuth: AuthenticationService,
              private firebaseDatabase: FirebaseService) 
  {
    if (firebaseAuth.user) {
      this.router.navigate(['/user']);
    }
  }

  toAuth() {
    this.router.navigate(['/auth']);
  }
  
}

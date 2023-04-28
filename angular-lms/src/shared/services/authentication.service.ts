import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { Observable, from, of } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: any;
  user: any;

  constructor(
              private firebaseApp: FirebaseService, 
              private route: ActivatedRoute,
              private router: Router
  ) { 
    this.auth = getAuth(firebaseApp.app);
    this.onState();
    this.user = null;
  }

  createNewUser(firstName: string, lastName: string, userName: string, email: string, password: string) : Observable<string> {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          // Добавляем расширенные данные пользователя в базу данных
          this.firebaseApp.createUserProfileData(userCredential.user.uid, firstName, lastName, userName, email);          
          return 'OK';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return error.message;
        }));
  }

  signInUser(email:string, password: string) : Observable<string> {
    return from (
      signInWithEmailAndPassword(this.auth, email, password)
        .then(() => {
          return 'OK';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          return errorMessage;
        })
    );
  }

  onState() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.firebaseApp.getUserProfileData(user.uid).subscribe((resp: any) => this.user = {uid: user.uid, ...resp.data()});
        this.router.navigate(['/user']);
      } else {
        
        this.router.navigate(['/']);
      }
    });
  }

  signOutUser(): Observable<string> {
    return from(
      signOut(this.auth).then(() => {
        this.user = null;
        // Sign-out successful.
        return 'OK';
      }).catch((error) => {
        // An error happened.
        return 'Error';
      })
    );  
  }
  
}




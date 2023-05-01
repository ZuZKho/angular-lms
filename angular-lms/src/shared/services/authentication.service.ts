import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth";
import { Observable, from, of } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserInfo } from '../interfaces/user.interface';
import { StoreService } from './store.service';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: any;
  userInfo: UserInfo | null = null;

  constructor(
              private firebaseApp: FirebaseService, 
              private route: ActivatedRoute,
              private router: Router,
              private store: StoreService,
              private coursesService: CoursesService
  ) { 
    this.auth = getAuth(firebaseApp.app);

    //====
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigate(['/user']);
        this.firebaseApp.getUserProfileData(user.uid)
          .then(
            (response: any) => {
              this.store.setUserInfo({uid: user.uid, ...response.data()});
              this.coursesService.getCoursesListByUserUID(user.uid);
            })
      } else {
        this.store.setUserInfo(null);
        this.router.navigate(['']);
      }
    });
    //====

    this.store.userInfo$.subscribe((user) => this.userInfo = user)
  }


  createNewUser(firstName: string, lastName: string, userName: string, email: string, password: string){
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          
          const newUser: UserInfo = {
            uid: userCredential.user.uid,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email
          }

          this.firebaseApp.createUserProfileData(newUser);          
          this.store.setUserInfo(newUser);
          
        })
        .catch((error) => {
          alert(error.message);
        });
  }

  signInUser(email:string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.firebaseApp.getUserProfileData(userCredential.user.uid)
          .then(
            (response: any) => this.store.setUserInfo({uid: userCredential.user.uid, ...response.data()} )
          )
                
      })
      .catch((error) => {
        alert(error.message);
      })
  
  }

  signOutUser() {
      signOut(this.auth).then(() => {
        // Sign-out successful.
        this.store.setUserInfo(null);
      }).catch((error) => {
        // An error happened.
        alert(error.message);
      })
  }

}




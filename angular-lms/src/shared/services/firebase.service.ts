import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import { from, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  app: FirebaseApp;
  database: any;
  constructor() {
    this.app = initializeApp(environment.firebaseConfig);
    this.database = getFirestore(this.app);
  }

  createUserProfileData(userInfo: UserInfo) {
    try {
      setDoc(doc(this.database, "usersProfiles", userInfo.uid), userInfo);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  getUserProfileData(userUID: string) {
    return getDoc(doc(this.database, "usersProfiles", userUID));
  }

}

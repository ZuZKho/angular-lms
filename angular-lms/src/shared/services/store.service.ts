import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../interfaces/user.interface';
import { Course } from '../interfaces/course.interface';
import { FirebaseService } from './firebase.service';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private database: FirebaseService) { }

  private readonly _userInfo$ = new BehaviorSubject<UserInfo | null>(null);
  readonly userInfo$ = this._userInfo$.asObservable();

  setUserInfo(info: UserInfo | null) { this._userInfo$.next(info); }

  private readonly _userCoursesList$ = new BehaviorSubject<Course[]>([]);
  readonly userCoursesList$ = this._userCoursesList$.asObservable();

  setCoursesList(courses: Course[]) {
    this._userCoursesList$.next(courses);
  }

}

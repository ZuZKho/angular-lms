import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../interfaces/user.interface';


@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  private readonly _userInfo$ = new BehaviorSubject<UserInfo | null>(null);
  readonly userInfo$ = this._userInfo$.asObservable();

  setUserInfo(info: UserInfo | null) {this._userInfo$.next(info)}

}

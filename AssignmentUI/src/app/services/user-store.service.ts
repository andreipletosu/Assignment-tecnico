import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private username$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");
  // private gifs$= new BehaviorSubject<any>([]);
  constructor() { }

  public getRoleFromStore(){
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string){
    return this.role$.next(role);
  }

  public getUsernameFromStore(){
    return this.username$.asObservable();
  }

  public setUsernameForStore(username: string){
    this.username$.next(username);
  }
}

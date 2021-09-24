import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUser } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserList(): Observable<IUser[]> {
    return this.http.get<IUser[]>('https://rocky-caverns-71712.herokuapp.com/users');
  }
}
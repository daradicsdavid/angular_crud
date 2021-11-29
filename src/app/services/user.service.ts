import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`http://localhost:3000/users/${user.id}`, user);
  }
  
  deleteUser(user: User) {
    return this.http.delete<User>(`http://localhost:3000/users/${user.id}`);
  }

}

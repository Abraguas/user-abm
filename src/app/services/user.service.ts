import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable()
export class UserService {
  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = "https://632b1463713d41bc8e7fdd8b.mockapi.io/wawa/users/";
  }
  registerUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);

  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);

  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl + user.id, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + id);
  }
  getById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + id);
  }
}

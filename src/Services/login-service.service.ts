import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { LoginUser } from 'src/Models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private username: string = '';
  constructor(private http:HttpClient, private router:Router) { }
  token = '';
  req : string = "https://localhost:7260/api/Users";

  getAllUsers(): Observable<LoginUser[]> {
    return this.http.get<LoginUser[]>(this.req).pipe(
      catchError(this.handleError<LoginUser[]>('getAllUsers', []))
    );
  }

  createUser(user: LoginUser): Observable<LoginUser> {
    return this.http.post<LoginUser>(this.req, user).pipe(
      catchError(this.handleError<LoginUser>('createUser'))
    );
  }

  getUserById(username:string): any{
    return this.http.get<LoginUser>(this.req+"/"+username)
  }
  
  getUserToken(user: LoginUser): Observable<string> {
    return this.getAllUsers().pipe(
      map(users => users.find(x => x.userName === user.userName && x.password === user.password)), // Fix here
      map(foundUser => {
        if (foundUser) {
          this.token = "validuser";
          localStorage.setItem("Username", foundUser.userName);
        } else {
          this.token = "";
        }
        this.saveToken();
        return this.token;
      }),
      catchError(() => {
        this.token = "";
        return of(this.token);
      })
    );
  }
  

  saveToken() {
    if (this.token !== "") {
      localStorage.setItem("token", this.token);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem("token") !== null;
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  getToken(): string {
    return localStorage.getItem("token") || '';
  }
  getUsername(): string {
    return localStorage.getItem("Username") || '';
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

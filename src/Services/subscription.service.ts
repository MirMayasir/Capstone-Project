import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Subscriptions } from 'src/Models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private readonly req = "https://localhost:7260/api/Subscriptions";

  constructor(private http: HttpClient) { }

  // Subscribe a user
  subscribe(username: string, planType: string): Observable<Subscriptions> {
    return this.http.post<Subscriptions>(`${this.req}/subscribe`, { username, planType }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError<Subscriptions>('subscribe'))
    );
  }

  // Unsubscribe a user
  unsubscribe(username: string): Observable<Subscriptions> {
    console.log("unsubscribe")
    return this.http.post<Subscriptions>(`${this.req}/unsubscribe`, { username }).pipe(
      catchError(this.handleError<Subscriptions>('unsubscribe'))
    );
  }
  
  
  

  // Get subscription details for a username
  // In subscription.service.ts
getSubscriptionByUsername(username: string): Observable<Subscriptions> {
  return this.http.get<Subscriptions>(`https://localhost:7260/api/Subscriptions/${username}`);
}



  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

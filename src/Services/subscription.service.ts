import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Subscriptions } from 'src/Models/subscription';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private readonly req = "https://localhost:7260/api/SubscriptionWithLayers";

  constructor(private http: HttpClient) { }

  // Subscribe a user
  subscribe(username: string, planType: string): Observable<Subscriptions> {
    return this.http.post<Subscriptions>(`${this.req}/subscribe`, { username, planType }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError<Subscriptions>('subscribe'))
    );
  }

  unsubscribe(username: string): Observable<Subscriptions> {
    console.log("Attempting to unsubscribe user:", username);
  
    // Sending the username as a JSON object
    return this.http.post<Subscriptions>(`${this.req}/unsubscribe`, { username }, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      catchError(error => {
        console.error('Unsubscribe failed:', error);
        return this.handleError<Subscriptions>('unsubscribe')(error);
      })
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

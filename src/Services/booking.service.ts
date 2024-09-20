import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bookings } from 'src/Models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }
  req:string = "https://localhost:7260/api/BookingsWithLayers";

  getLastBookingByUsername(customerName: string): Observable<Bookings> {
    console.log("Fetching last booking for:", customerName);
    return this.http.get<Bookings>(`${this.req}/byname?customerName=${customerName}`);
  }

  AddBookings(customer: Bookings):Observable<Bookings>{
    console.log(customer);
    return this.http.post<Bookings>(this.req, customer, {
      headers : new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': '*'
      })
    })
  }
}

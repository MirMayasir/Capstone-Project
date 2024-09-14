import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Drugs } from 'src/Models/drugs';

@Injectable({
  providedIn: 'root'
})
export class DrugsServiceService {

  constructor(private http:HttpClient) { }
  req:string="https://localhost:7260/api/Drugs";

  getAllAvailableDrugs() :Observable<Drugs[]>{
    console.log(this.req)
    return this.http.get<Drugs[]>(this.req);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bookings } from 'src/Models/booking';
import { Drugs } from 'src/Models/drugs';
import { BookingService } from 'src/Services/booking.service';
import { DrugsServiceService } from 'src/Services/drugs-service.service';
import { LoginServiceService } from 'src/Services/login-service.service';

@Component({
  selector: 'app-confirm-drug',
  templateUrl: './confirm-drug.component.html',
  styleUrls: ['./confirm-drug.component.css']
})
export class ConfirmDrugComponent implements OnInit {

  username:string="";
  bookID = 0;
  drugs:Drugs={name:"", description:"", drugId:0, manufacturer:"", price:0, region:"", stock:0};
  bookings:Bookings={drugName:"", drugDescription:"", dosagePeriod:0,bookingId:0, manufacturer:"", region:"", customerName:"", price:0, bookDate:new Date().toISOString().split('T')[0]};
  constructor(private bookingservice:BookingService, private drugservices:DrugsServiceService,private route:ActivatedRoute, private loginservice:LoginServiceService) { 
    this.bookID = Number(this.route.snapshot.paramMap.get("drugId"));
  }

  ngOnInit(): void {
    this.username = this.loginservice.getUsername();
    console.log("booking id is " + this.bookID);
    this.drugservices.getCustomerById(this.bookID).subscribe(data=>{
      this.drugs=data;
      console.log("angular component");
      console.log(this.username);
    })
  }

  saveData(){

    this.bookings.bookingId=this.drugs.drugId;
    this.bookings.drugDescription=this.drugs.description;
    this.bookings.drugName=this.drugs.name;
    this.bookings.manufacturer=this.drugs.manufacturer;
    this.bookings.price=this.drugs.price;
    this.bookings.region=this.drugs.region;
    this.bookings.customerName=this.username;
    console.log(this.bookings.bookDate);
    console.log("thise user name is "+ this.bookings.customerName);
    this.bookingservice.AddBookings(this.bookings).subscribe(data=>{
    alert("booking confirmed");
    })
  }

}

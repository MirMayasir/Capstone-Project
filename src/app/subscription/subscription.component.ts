import { Component, OnInit } from '@angular/core';
import { Subscriptions } from 'src/Models/subscription';
import { SubscriptionService } from 'src/Services/subscription.service';
import { LoginServiceService } from 'src/Services/login-service.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  username: string = '';
  subscription: Subscriptions | null = null;
  isSubscribed: boolean = false;
  message: string = '';
  sub: Subscriptions={isSubscribed:true, subscriptionDate: new Date(), subscriptionID:0, username:"", unsubscribeDate: new Date()};

  constructor(
    private subscriptionService: SubscriptionService,
    private loginService: LoginServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.username = this.loginService.getUsername(); // Retrieve the username from the login service
    if (this.username) {
      this.getSubscriptionStatus();
    }
    console.log(this.username)
  }

  getSubscriptionStatus(): void {
    console.log("Retrieving subscription status for user:", this.username);
    this.subscriptionService.getSubscriptionByUsername(this.username).subscribe({
      next: (subscription) => {
        console.log('Received subscription data:', subscription);
        if (subscription) {
          this.subscription = subscription;
          this.isSubscribed = subscription.isSubscribed;
          this.message = '';
        } else {
          console.warn('No subscription data found.');
        }
      },
      error: (err) => {
        console.error('Error fetching subscription:', err);
        this.message = 'Failed to fetch subscription status.';
      }
    });

  }
  // getSubscriptionStatus(){
  //   this.subscriptionService.getSubscriptionByUsername(this.username).subscribe(data=>{
  //     this.sub=data;
  //   });
  // }
  
  
  

  toggleSubscription(): void {
    if (this.isSubscribed) {
      this.subscriptionService.unsubscribe(this.username).subscribe(
        response => {
          this.subscription = null; // Clear the subscription info
          this.isSubscribed = false;
          this.message = 'You have unsubscribed successfully.';
        },
        error => {
          console.error('Unsubscribe failed:', error);
        }
      );
    } else {
      this.subscriptionService.subscribe(this.username).subscribe(
        response => {
          this.subscription = response; // Update with new subscription info
          this.isSubscribed = true;
          this.message = 'You have subscribed successfully.';
        },
        error => {
          console.error('Subscribe failed:', error);
        }
      );
    }
  }

}

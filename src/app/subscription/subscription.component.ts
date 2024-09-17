import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscriptions } from 'src/Models/subscription';
import { SubscriptionService } from 'src/Services/subscription.service';
import { LoginServiceService } from 'src/Services/login-service.service';

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
  selectedPlanType: string = 'Monthly'; // Default plan type
  availablePlans: string[] = ['Weekly', 'Monthly', 'Yearly'];

  constructor(
    private subscriptionService: SubscriptionService,
    private loginService: LoginServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.username = this.loginService.getUsername();
    if (this.username) {
      this.getSubscriptionStatus();
    }
  }

  getSubscriptionStatus(): void {
    this.subscriptionService.getSubscriptionByUsername(this.username).subscribe({
      next: (subscription) => {
        if (subscription) {
          this.subscription = subscription;
          this.isSubscribed = subscription.isSubscribed;
          this.message = '';
        } else {
          this.message = 'No subscription data found.';
        }
        this.cdr.detectChanges(); // Update view if necessary
      },
      error: (err) => {
        this.message = 'Failed to fetch subscription status.';
        console.error('Error fetching subscription status:', err);
        this.cdr.detectChanges(); // Update view if necessary
      }
    });
  }

  toggleSubscription(): void {
    if (this.isSubscribed) {
      this.subscriptionService.unsubscribe(this.username).subscribe(
        () => {
          this.subscription = null; // Clear the subscription info
          this.isSubscribed = false;
          this.message = 'You have unsubscribed successfully.';
          alert("UnSubscribed Successfully");
        },
        error => {
          this.message = 'Unsubscribe failed.';
          console.error('Unsubscribe failed:', error);
        }
      );
    } else {
      this.subscriptionService.subscribe(this.username, this.selectedPlanType).subscribe(
        response => {
          this.subscription = response; // Update with new subscription info
          this.isSubscribed = true;
          this.message = 'You have subscribed successfully.';
          alert("Subscribed Successfully");
        },
        error => {
          this.message = 'Subscribe failed.';
          console.error('Subscribe failed:', error);
        }
      );
    }
  }
}

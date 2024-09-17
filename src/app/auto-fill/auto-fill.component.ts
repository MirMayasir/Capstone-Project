import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SubscriptionService } from 'src/Services/subscription.service';
import { LoginServiceService } from 'src/Services/login-service.service';
import { Subscriptions } from 'src/Models/subscription';

@Component({
  selector: 'app-auto-fill',
  templateUrl: './auto-fill.component.html',
  styleUrls: ['./auto-fill.component.css']
})
export class AutoFillComponent implements OnInit {
  username: string = '';
  subscription: Subscriptions | null = null;
  autoFillData: any = {}; // Data to auto-fill form fields or similar
  message: string = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private loginService: LoginServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.username = this.loginService.getUsername();
    if (this.username) {
      this.getSubscriptionDetails();
    }
  }

  getSubscriptionDetails(): void {
    this.subscriptionService.getSubscriptionByUsername(this.username).subscribe({
      next: (subscription) => {
        if (subscription) {
          this.subscription = subscription;
          this.autoFillData = this.mapToAutoFillData(subscription);
          this.message = '';
        } else {
          this.message = 'No subscription data found.';
        }
        this.cdr.detectChanges(); // Update view if necessary
      },
      error: (err) => {
        this.message = 'Failed to fetch subscription details.';
        console.error('Error fetching subscription details:', err);
        this.cdr.detectChanges(); // Update view if necessary
      }
    });
  }

  mapToAutoFillData(subscription: Subscriptions): any {
    const nextDate = this.calculateNextSubscriptionDate(subscription.planType, subscription.subscriptionDate);
    return {
      planType: subscription.planType || 'Not Specified',
      status: subscription.isSubscribed ? 'Active' : 'Inactive',
      startDate: subscription.subscriptionDate ? new Date(subscription.subscriptionDate).toLocaleDateString() : 'N/A',
      nextSubscriptionDate: nextDate ? new Date(nextDate).toLocaleDateString() : 'N/A',
    };
  }

  calculateNextSubscriptionDate(planType: string, startDate: Date | null): Date | null {
    if (!startDate) return null;

    const start = new Date(startDate);
    const now = new Date();
    let nextDate = new Date(start);

    switch (planType) {
      case 'Weekly':
        nextDate.setDate(start.getDate() + 7);
        break;
      case 'Monthly':
        nextDate.setMonth(start.getMonth() + 1);
        break;
      case 'Yearly':
        nextDate.setFullYear(start.getFullYear() + 1);
        break;
      default:
        return null;
    }

    // If the calculated date is before the current date, calculate the next occurrence
    while (nextDate <= now) {
      switch (planType) {
        case 'Weekly':
          nextDate.setDate(nextDate.getDate() + 7);
          break;
        case 'Monthly':
          nextDate.setMonth(nextDate.getMonth() + 1);
          break;
        case 'Yearly':
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          break;
      }
    }

    return nextDate;
  }
}

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SubscriptionService } from 'src/Services/subscription.service';
import { BookingService } from 'src/Services/booking.service';
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
  lastBookingData: any = {}; // Data to display last booking details
  message: string = '';

  constructor(
    private subscriptionService: SubscriptionService,
    private bookingService: BookingService,
    private loginService: LoginServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.username = this.loginService.getUsername();
    if (this.username) {
      this.getSubscriptionDetails();
      this.getAllBookingDetails();
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

  getAllBookingDetails(): void {
    console.log('Fetching all bookings for:', this.username);
    this.bookingService.getLastBookingByUsername(this.username).subscribe({
      next: (response: any) => {
        console.log('API Response:', response); // Log the entire API response

        // Handle if response is an array
        if (Array.isArray(response) && response.length > 0) {
          this.lastBookingData = response.map(booking => this.mapToBookingData(booking)); // Map all bookings
          console.log('Mapped Booking Data:', this.lastBookingData);
          this.message = '';
        } else {
          this.message = 'No booking data found.';
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.message = 'Failed to fetch booking details.';
        console.error('Error fetching booking details:', err);
        this.cdr.detectChanges();
      }
    });
  }

mapToBookingData(booking: any): any {
    console.log('Inside mapToBookingData');
    console.log('Booking Data:', booking); // Log booking data

    // Ensure booking data has the required fields
    const lastOrderDate = booking.bookDate ? new Date(booking.bookDate) : null;
    const dosagePeriod = booking.dosagePeriod || 0; // Default to 0 if undefined
    console.log('Dosage Period:', dosagePeriod);
    
    const nextPrescriptionDate = this.calculateNextPrescriptionDate(dosagePeriod, lastOrderDate);
    
    return {
      bookingId : booking.bookingId || 'Not Specified',
      drugName: booking.drugName || 'Not Specified',
      lastOrderDate: lastOrderDate ? lastOrderDate.toLocaleDateString() : 'N/A',
      nextPrescriptionDate: nextPrescriptionDate ? nextPrescriptionDate.toLocaleDateString() : 'N/A',
      manufacturer: booking.manufacturer || 'Not Specified',
      price : booking.price || 'Not Specified',
    };
}

calculateNextPrescriptionDate(dosagePeriod: number, lastOrderDate: Date | null): Date | null {
    console.log('Dosage Period:', dosagePeriod);
    if (!lastOrderDate || dosagePeriod <= 0) return null;

    const nextDate = new Date(lastOrderDate); // Use Date object directly
    nextDate.setDate(lastOrderDate.getDate() + dosagePeriod);
    console.log('The next date is:', nextDate);

    return nextDate;
}

  
  
}

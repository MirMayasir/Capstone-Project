import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/Models/login';
import { LoginServiceService } from 'src/Services/login-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile: LoginUser | null = null;
  message: string = '';
  username: string = '';

  constructor(private profileService: LoginServiceService) {}

  ngOnInit(): void {
    this.username = this.profileService.getUsername();
    if (this.username) {
      this.getUserProfile(this.username);
    } else {
      this.message = 'Username not found.';
    }
  }

  getUserProfile(username: string): void {  // Added type for username
    this.profileService.getUserProfile(username).subscribe({
      next: (profile) => {
        this.userProfile = profile;
        this.message = '';
      },
      error: (err) => {
        this.message = 'Failed to fetch profile data.';
        console.error('Error fetching profile data:', err);
      }
    });
  }

  updateProfile(updatedProfile: LoginUser): void {
    this.profileService.updateUserProfile(updatedProfile).subscribe({
      next: () => {
        this.message = 'Profile updated successfully!';
        this.getUserProfile(this.username); // Fetch updated profile data
        alert("Details updated successfully");
      },
      error: (err) => {
        this.message = 'Failed to update profile.';
        console.error('Error updating profile:', err);
      }
    });
  }

}

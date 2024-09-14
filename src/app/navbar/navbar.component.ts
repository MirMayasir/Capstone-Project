import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  isNavbarOpen = false;
  isLoggedIn = false; // Replace this with your actual authentication logic

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  logout() {
    // Logic for logging out the user
    this.isLoggedIn = false;
  }

}

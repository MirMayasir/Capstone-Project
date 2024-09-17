import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/Models/login';
import { LoginServiceService } from 'src/Services/login-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user:LoginUser[];
  u:LoginUser={userName:"", password:"", email:""};
  constructor(private loginservice:LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  }
  flag:false;

  register(){
    this.loginservice.createUser(this.u).subscribe(data=>{
      alert("user added");
      flag:true;
    })
  }
  signupSection(){
    this.router.navigate(['/login']);
  }

}

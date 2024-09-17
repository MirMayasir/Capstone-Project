import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/Models/login';
import { LoginServiceService } from 'src/Services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:LoginUser;
  errormsg:string;
  u:LoginUser={userName:"", password:"", email:""};
  constructor(private route:Router, private loginservice:LoginServiceService) { 
    this.user = { userName: "", password: "", email:"" };
  }
  userform:FormGroup=new FormGroup({});

  ngOnInit(): void {
    this.userform=new FormGroup(
      {
        username:new FormControl(this.user.userName,[
          Validators.required, Validators.minLength(3)
        ]),
        password:new FormControl(this.user.password,[
          Validators.required,Validators.maxLength(20)
        ]),
      }
    );

  }

  login(): void {
    let currentuser: LoginUser = {
      userName: this.userform.value.username,
      password: this.userform.value.password,
      email : this.userform.value.Email
    };
    try {
      this.loginservice.getUserToken(currentuser).subscribe(token => {
        if (token === "validuser") {
          localStorage.setItem("token", token);
          this.route.navigateByUrl("");
        } else {
          alert("Incorrect Credentials");
          this.route.navigateByUrl('/login');
        }
      });
    } catch (Exception) {
      this.errormsg = "Credentials incorrect";
    }
  }

}

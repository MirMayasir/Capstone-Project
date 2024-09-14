import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { DrugsComponent } from './drugs/drugs.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {path: "" , component:HomeComponent},
  {path: "login", component:LoginComponent},
  {path: "signup", component:SigninComponent},
  {path: "drugs", component:DrugsComponent},
  {path: "subscription", component:SubscriptionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

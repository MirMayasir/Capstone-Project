import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { DrugsComponent } from './drugs/drugs.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AutoFillComponent } from './auto-fill/auto-fill.component';
import { ConfirmDrugComponent } from './confirm-drug/confirm-drug.component';
import { AuthGuard } from 'src/Guard/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: "" , component:HomeComponent},
  {path: "login", component:LoginComponent},
  {path: "signup", component:SigninComponent},
  {path: "drugs", component:DrugsComponent, canActivate:[AuthGuard]},
  {path: "subscription", component:SubscriptionComponent, canActivate:[AuthGuard]},
  {path: "auto-fill", component:AutoFillComponent, canActivate:[AuthGuard]},
  {path: "confirm-booking/:drugId", component:ConfirmDrugComponent},
  {path: "profile", component:ProfileComponent, canActivate:[AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

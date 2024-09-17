import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DrugsComponent } from './drugs/drugs.component';
import { drugName, drugRegion } from './filters';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AutoFillComponent } from './auto-fill/auto-fill.component';
import { ConfirmDrugComponent } from './confirm-drug/confirm-drug.component';
import { ProfileComponent } from './profile/profile.component';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    DrugsComponent,
    drugName,
    drugRegion,
    SubscriptionComponent,
    AutoFillComponent,
    ConfirmDrugComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ValidateService } from './services/validate.service';
import { AuthService} from './services/auth.service'
import { FlashMessagesModule } from 'flash-messages-angular';
import { HttpClientModule } from '@angular/common/http'
import { AuthGuard } from './auth.guard';
// import {AuthGuard} from './auth.guard';
const appRoutes : Routes = [
  { path:'', component:HomeComponent},
  { path:'register', component:RegisterComponent},
  { path:'dashboard',canActivate:[AuthGuard], component:DashboardComponent},
  { path:'login', component:LoginComponent},
  { path:'profile',canActivate:[AuthGuard], component:ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [ValidateService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {} 
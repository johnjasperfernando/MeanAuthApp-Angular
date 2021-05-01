import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import{Router} from '@angular/router';
import{FlashMessagesService} from 'flash-messages-angular';
// import { Console } from 'node:console';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
   ) { }

  ngOnInit(): void {
  }
  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out',{cssClass:"alert-success",
  timeout:3000});
  this.router.navigate(['/login'])
  return false;
  }
}

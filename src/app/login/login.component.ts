import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import{Router} from '@angular/router';
import{FlashMessagesService} from 'flash-messages-angular';
// import { Console } from 'node:console';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService
    ) { }

  ngOnInit(): void {
  }
  onLoginSubmit(){
    // console.log(this.username);
    const user={
      username:this.username,
      password:this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
      // console.log(data);
      if(data['success'])
      {
        this.authService.storeUserData(data['token'], data['user']);
        this.flashMessage.show("You are now logged in ",{cssClass:'alert-Success',timeout:50000});
        this.router.navigate(['/dashboard']);
      }
      else
      {
        this.flashMessage.show(data['msg'],{cssClass:'alert-danger',timeout:50000});
        this.router.navigate(['/login']);
      }
    });
  }
  
}

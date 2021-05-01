import { Component, OnInit,Input } from '@angular/core';
import { ValidateService} from '../services/validate.service';
import { AuthService} from '../services/auth.service'
import { FlashMessagesService } from 'flash-messages-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public name="";
  public username= "";
  public email="";
  public password=""; 

  constructor(
    private validateService:ValidateService, 
    private authService:AuthService, 
    private flashmessage:FlashMessagesService,
    private router:Router) { }
  ngOnInit(): void {

  }
  onRegisterSubmit()
  {
    const user={
      name:this.name,
      email:this.email,
      username:this.username,
      password:this.password
    }
    // console.log(user.name);

    if(!this.validateService.validateRegister(user)){
      this.flashmessage.show("Please fill in all details",{cssClass:'alert-danger',timeout:3000});
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      console.log(user.email);
      console.log("Please use a valid email");
      return false;
    }
    //Register
    this.authService.registerUser(user).subscribe(data =>{
      if(data['success'])
      {
        this.flashmessage.show("User Registered",{cssClass:'alert-success',timeout:3000});
        this.router.navigate(['/login']);
      }
      else
      {
        this.flashmessage.show("Something went wrong",{cssClass:'alert-danger',timeout:3000});
        this.router.navigate(['/register']);
      }
      });
      return undefined; 
  }
 
}
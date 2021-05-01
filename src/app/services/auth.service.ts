  import { Injectable } from '@angular/core';
  import { HttpHeaders,HttpClient} from '@angular/common/http';
  import 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  // @Injectable()
  export class AuthService {
    authToken: any;
    user :any;
    constructor(
      private httpClient:HttpClient
      ) { }
    registerUser(user) {
      let headers= new HttpHeaders();
      headers=headers.append('Content-Type','application/json');
      return this.httpClient.post('http://localhost:3000/users/register',user,{headers: headers});
    }
    authenticateUser(user)
    {
      console.log(user);
      let headers= new HttpHeaders();
      headers=headers.append('Content-Type','application/json');
      return this.httpClient.post('/users/authenticate',user,{headers: headers});
    }

    getProfile()
    {
      // console.log(user);
      let headers= new HttpHeaders();
      this.loadToken();
      console.log(this.authToken);
      headers=headers.append('Authorization',this.authToken);
      headers=headers.append('Content-Type','application/json');
      console.log(headers);
      return this.httpClient.get('/users/profile',{headers: headers});
    }

    storeUserData(token,user){
      localStorage.setItem('id_token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken=token;
      this.user=user; 
    }

    loadToken()
    {
      const token=localStorage.getItem('id_token');
      this.authToken=token;
    }

    logout()
    {
      this.authToken=null;
      this.user=null;
      localStorage.clear();
    }

    loggedIn()
    {
      return !!localStorage.getItem('id_token');
    }
  }
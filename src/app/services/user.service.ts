import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignIn, SignUp } from '../datatype';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient , private router:Router) { }

  userUrl:string = "http://localhost:3000/users";
  isLoginError:EventEmitter<boolean> = new EventEmitter<boolean>(false);

  userSignUp(data:SignUp){
    this.http.post(this.userUrl , data , {observe:'response'}).subscribe((result)=>{
      console.warn(result.body);
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }

  userLogin(data:SignIn){
    this.http.get(`${this.userUrl}?name=${data.username}&password=${data.userpassword}`,
    { observe: 'response' }).subscribe((result:any)=>{
      if(result && result.body && result.body.length > 0){
        localStorage.setItem('user',JSON.stringify(result.body[0]));
        this.isLoginError.emit(false);
        this.router.navigate(['home']);
      }else{
        console.log("Login Failed");
        this.isLoginError.emit(true);
      }
    });
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }

}

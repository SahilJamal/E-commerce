import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { SignIn, SignUp } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { isSellerLoggedIn } from '../utils/session';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private http:HttpClient , private router:Router) { }

  sellerUrl:string = 'http://localhost:3000/seller';
  isLoginError:EventEmitter<boolean> = new EventEmitter<boolean>(false);

  userSignUp(data:SignUp){
    this.http.post(this.sellerUrl, data, { observe: 'response' }).
      subscribe((result)=>{
        isSellerLoggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      });
  }

  reloadSeller(){
    if(localStorage.getItem('seller')){
      isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

  userSignIn(data:SignIn){
    this.http.get(`${this.sellerUrl}?name=${data.username}&password=${data.userpassword}`,
    { observe: 'response' }).
    subscribe((result:any)=>{
      if(result && result.body && result.body.length > 0){
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }else{
        this.isLoginError.emit(true);
      }
    });
  }
}

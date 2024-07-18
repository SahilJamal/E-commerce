import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {

  constructor(private seller:SellerService , private router:Router){}

  showLogin:boolean = false;
  errorMessage:string = '';

  ngOnInit():void{
    this.seller.reloadSeller();
  }

  openLogin():void{
    this.showLogin = !this.showLogin;
  }

  signup = new FormGroup({
    name:new FormControl('',[Validators.maxLength(15),Validators.required]),
    email:new FormControl('',[Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$"),Validators.required]),
    password:new FormControl('',[Validators.required])
  });

  signin = new FormGroup({
    username:new FormControl('',[Validators.required]),
    userpassword:new FormControl('',[Validators.required])
  });

  get name():FormControl{
    return this.signup.controls.name;
  }

  get email():FormControl{
    return this.signup.controls.email;
  }

  get password():FormControl{
    return this.signup.controls.password;
  }

  get username():FormControl{
    return this.signin.controls.username;
  }

  get userpassword():FormControl{
    return this.signin.controls.userpassword;
  }

  signIn(data:any):void{
    this.seller.userSignIn(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.errorMessage = 'Username Or Password is Invalid.'
      }
    });
  }

  signUp(data:any):void{
    this.seller.userSignUp(data);
  }
}
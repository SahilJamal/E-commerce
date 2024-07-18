import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Cart, Product } from '../datatype';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {

  constructor(private us:UserService , private router:Router , private ps:ProductService){}

  showLogin:boolean = false;
  errorMessage:string = '';

  ngOnInit():void{
     this.us.userAuthReload();
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
    this.us.userLogin(data);
    this.us.isLoginError.subscribe((isError)=>{
      if(isError){
        this.errorMessage = 'Username Or Password is Invalid.'
      }else{
        this.localCartToRemoteCart();
      }
    });
  }

  signUp(data:any):void{
    this.us.userSignUp(data);
  }

  localCartToRemoteCart(){
    let cartdata = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(cartdata){
      let cartItems:Product[] = JSON.parse(cartdata);
      cartItems.forEach((product:Product,index) => {
        let cartData:|Cart = {
          ...product,
          productId:product.id,
          userId:userId
        };

        delete cartData.id
        setTimeout(()=>{
          this.ps.addToCart(cartData).subscribe((result)=>{
          if(result){
            console.warn("Item stored in db");
          }
          });
        },500);
        if(cartItems.length === index+1){
          localStorage.removeItem('localCart');
        }
      });
    }

    setTimeout(()=>{
      this.ps.getCartList(userId);
    },100);
  }

}

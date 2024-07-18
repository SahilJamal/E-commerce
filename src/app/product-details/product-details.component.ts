import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product , Cart } from '../datatype';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{

  constructor(private acitiveroute:ActivatedRoute , private ps:ProductService){}

  productData:undefined | Product;

  quantity:number=1;

  removeCart:boolean = false;

  productId:number = 0;

  cartData:Product | undefined;

  ngOnInit(): void {
    
     this.productId = Number(this.acitiveroute.snapshot.paramMap.get('productId'));

    this.productId && this.ps.singleProduct(this.productId).subscribe((result)=>{
      this.productData = result;

      let cartData = localStorage.getItem('localCart');

      if(this.productId && cartData){
          let items = JSON.parse(cartData);
          items = items.filter((item:Product)=>this.productId === item.id)
          if(items.length){
            this.removeCart = true;
          }else{
            this.removeCart = false;
          }
      }

      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.ps.getCartList(userId);
        this.ps.cartData.subscribe((result)=>{
          let item = result.filter((item:Product)=>this.productId === item.productId)
          if(item.length > 0){
            this.cartData = item[0];
            this.removeCart = true;
          }
        });
      }
      


    });


  }

  addQuntity():void{

    if(this.quantity >= 20){
      return;
    }
    this.quantity += 1;
  }

  subQuntity():void{

    if(this.quantity === 1){
      return;
    }

    this.quantity -= 1;

  }

  addToCart():void{
    if(this.productData){
      this.productData.quantity = this.quantity;
      if(!localStorage.getItem('user')){
        this.ps.localAddToCart(this.productData);
        this.removeCart = true;
      }else{
        console.warn("User is LoadeIn");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData:Cart = {
          ...this.productData,
          userId,
          productId:this.productData.id,
          }
          delete cartData.id;
        console.log(cartData);
        this.ps.addToCart(cartData).subscribe((result)=>{
          if(result){
            this.ps.getCartList(userId);
            this.removeCart = true;
          }
          
        });
      }     
    }
  }


  removeToCart():void{
    if(!localStorage.getItem('user')){
    this.ps.localRemoveToCart(this.productId);
    }else{
      let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.cartData && this.ps.removeFromCart(this.cartData.id).subscribe((result)=>{
          if(result){
            this.ps.getCartList(userId);
            
          }
        });
    }

    this.removeCart = false;

  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable , EventEmitter } from '@angular/core';
import { Cart, Product } from '../datatype';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  cartData:EventEmitter<Product[] | []> = new EventEmitter<Product[] | []>();

  productsUrl:string = 'http://localhost:3000/products';
  cartUrl:string = 'http://localhost:3000/cart';

  addProduct(data:Product){
    return this.http.post(this.productsUrl,data);
  }

  updateProduct(id:number,data:Product){
    return this.http.put<Product>(`${this.productsUrl}/${id}`,data);
  }

  productList(){
    return this.http.get<Product[]>(this.productsUrl);
  }

  getRestrictedProducts(){
    return this.http.get<Product[]>(`${this.productsUrl}?_limit=5`);
  }

  singleProduct(id:number){
   return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  deleteProduct(id:number){
    return this.http.delete(`${this.productsUrl}/${id}`);
  }

  searchProduct(query:string){
    return this.http.get<Product[]>(`${this.productsUrl}?q=${query}`);
  }

  localAddToCart(data:Product){
    let cartData:undefined|Product[] = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify(data))
      console.log(localCart);
      cartData = [data];
    }else{
        cartData = JSON.parse(localCart);
        if (!Array.isArray(cartData)) {
          cartData = [data]; // Initialize cartData with the first item if it's not an array
        } else {
          cartData.push(data);
        }
        localStorage.setItem('localCart',JSON.stringify(cartData));
        console.log(cartData);
    }
    this.cartData.emit(cartData);
  }

  localRemoveToCart(productId:number):void{
    let cartdata = localStorage.getItem('localCart');    
    if(cartdata){
      let items:Product[] = JSON.parse(cartdata);  
      items = items.filter((item:Product)=>productId !== item.id); 
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(data:Cart){
    return this.http.post(this.cartUrl,data);
  }

  getCartList(userId:number){
    return this.http.get<Product[]>(`${this.cartUrl}?userId=${userId}`,{observe:'response'}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    });
  }

  removeFromCart(cartId:number){
    return this.http.delete(`${this.cartUrl}/${cartId}`);
  }
}

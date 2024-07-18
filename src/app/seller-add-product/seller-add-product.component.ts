import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {

  constructor(private ps:ProductService){}

  addProductMessage:string|undefined = '';

  formData = new FormGroup({
    name:new FormControl(''),
    price:new FormControl(''),
    color:new FormControl(''),
    category:new FormControl(''),
    description:new FormControl(''),
    imageUrl:new FormControl('')
  });

  addProduct(data:any):void{
    this.ps.addProduct(data).subscribe((result)=>{
      this.addProductMessage = "Product added Successfully";
    });
  }

}

import { Component , OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../datatype';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private ps:ProductService){}

  products:Product[] = [];
  allProducts:Product[] = [];

  ngOnInit(): void {
    this.getListedProducts();
    this.getAllProduct();
  }

  getListedProducts(){
    this.ps.getRestrictedProducts().subscribe((result)=>{      
      this.products = result;
    })
  }

  getAllProduct():void{
    this.ps.productList().subscribe((result)=>{
      this.allProducts = result;
    });
  }
  
  page:number = 1;
}

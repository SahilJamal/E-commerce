import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../datatype';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  constructor(private activeRoute:ActivatedRoute , private ps:ProductService){
  }

  allProducts:undefined|Product[];

  query:any;

  ngOnInit(): void {
  
    this.activeRoute.paramMap.subscribe((params) => {
      this.query = params.get('query');
      if (this.query) {
        this.searchResult();
      }
    });

  }

  searchResult():void{
    this.ps.searchProduct(this.query).subscribe((result) => {
      this.allProducts = result;
    });
  }

}

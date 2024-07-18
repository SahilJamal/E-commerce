import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map , startWith } from "rxjs/operators";



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  constructor(private router:Router , private ps:ProductService){}

  menuType:string = 'default';

  sellerName:string = '';

  userName:string = '';

  cartItems:number = 0;

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  ngOnInit():void{
    this.router.events.subscribe((data:any)=>{
      if(data.url){
        if(localStorage.getItem('seller') && data.url.includes('seller')){
          this.menuType = 'seller'
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }else if(localStorage.getItem('user')){
          this.menuType = 'user';
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.ps.getCartList(userData.id);
        }
        else{
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');

    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }

    this.ps.cartData.subscribe((items)=>{
      this.cartItems = items.length;
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  signOut():void{
    localStorage.removeItem('seller');
    this.router.navigate(['']);
  }

  userLogout():void{
    localStorage.removeItem('user');
    this.router.navigate(['user-auth']);
    this.ps.cartData.emit([]);
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.ps.searchProduct(element.value).subscribe((result)=>{
        result.length = 3
          this.options = result.map(q=>q.name);
      });
    }
  }

  submitSearch(event:KeyboardEvent): void{
    if(event.key === 'Enter'){
      this.router.navigate([`search/${this.myControl.value}`]);
      this.myControl.reset();
    }
  }

}

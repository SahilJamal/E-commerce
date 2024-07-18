import { Component , Input, OnInit } from '@angular/core';
import { Product } from '../datatype';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit{


  @Input() products:Product[] = [];
  @Input() indicator = true;
  @Input() controls = true;
  @Input() autoSlide = false;
  @Input() slideInterval = 3000;


  selectedIndex:number = 0;

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideProducts();
    }
    
  }

  autoSlideProducts():void{
    setInterval(()=>{
      this.onNextClick();
    },this.slideInterval);
  }

  selectImage(index :number):void{
    this.selectedIndex = index;
  }

  onPrevClick():void{
    if(this.selectedIndex === 0){
      this.selectedIndex = this.products.length - 1;
    } else {
      this.selectedIndex--;
    }
  }

  onNextClick():void{
    var lastIndex = this.products.length - 1;
    if(this.selectedIndex === lastIndex){
      this.selectedIndex = 0;
    } else {
      this.selectedIndex++;
    }
  }
}

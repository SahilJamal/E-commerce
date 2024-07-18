import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    CarouselComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule { }

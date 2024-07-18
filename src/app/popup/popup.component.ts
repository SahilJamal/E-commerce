import { Component , OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from '../services/product.service';
import { Product } from '../datatype';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private ps:ProductService){}

  inputdata: undefined | Product;
  option:any;

  ngOnInit(): void {
    this.getProduct();
    this.option = this.data.value;    
  }

  formData = new FormGroup({
    name:new FormControl(''),
    price:new FormControl(0),
    color:new FormControl(''),
    category:new FormControl(''),
    description:new FormControl(''),
    imageUrl:new FormControl('')
  });

  getProduct(){
    this.ps.singleProduct(this.data.id).subscribe((result)=>{
      if(result){
        this.inputdata = result;        
        this.formData.controls.name.setValue(this.inputdata.name);
        this.formData.controls.price.setValue(this.inputdata.price);
        this.formData.controls.color.setValue(this.inputdata.color);
        this.formData.controls.category.setValue(this.inputdata.category);
        this.formData.controls.description.setValue(this.inputdata.description);
        this.formData.controls.imageUrl.setValue(this.inputdata.imageUrl);
      }
    });
  }

  deleteProduct(){
    this.ps.deleteProduct(this.data.id).subscribe((result)=>{
      console.log('delete successfully');
    });
  }



  editProduct(data:any){
    this.ps.updateProduct(this.data.id,data).subscribe((result)=>{
      console.log("Update Successfully");
      
    });
  }

}

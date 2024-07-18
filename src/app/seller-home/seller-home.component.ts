import { Component, OnInit, ViewChild} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../datatype';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit{

  constructor(private ps:ProductService , private dialog:MatDialog){}

  productList:undefined | Product[];

  dataSource:any;

  displayedColumns:string[] = ['imageUrl','name','price','color','category','description','action'];

  @ViewChild(MatPaginator) paginator !:MatPaginator;

  @ViewChild(MatSort) sort !:MatSort;

  ngOnInit(): void {
   this.productLists();
  }

  filterChange(data:Event){
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  productLists(){
    this.ps.productList().subscribe((result)=>{
      this.productList = result;
      this.dataSource = new MatTableDataSource<Product>(this.productList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editProduct(id:number){
    var popup = this.dialog.open(PopupComponent,{
      width:'60%',
      height:'500px',
      enterAnimationDuration:300,
      exitAnimationDuration:300,
      data:{
        value:'edit',
        id:id
      }
    });

    popup.afterClosed().subscribe((item)=>{
      this.productLists();
    });
  }

  deleteProduct(id:number){
    var popup = this.dialog.open(PopupComponent,{
      width:'60%',
      height:'400px',
      enterAnimationDuration:300,
      exitAnimationDuration:300,
      data:{
        value:'delete',
        id:id
      }
    });

    popup.afterClosed().subscribe((item)=>{
      this.productLists();
    });
  }

}

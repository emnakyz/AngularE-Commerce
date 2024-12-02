import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/IProduct';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : IProduct;
  constructor(
    private shopService : ShopService,
    private activateRoute : ActivatedRoute,
    private breadcrumbService : BreadcrumbService
  ) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    this.shopService.getProduct(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(
    pro =>{
         this.product = pro;
         this.breadcrumbService.set('@shopDetail',pro.name);
    }),
    error=>{
        console.log(error);
    }
  }

}

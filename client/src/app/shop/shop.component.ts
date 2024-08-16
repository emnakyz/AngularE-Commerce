import { Component, OnInit } from '@angular/core';
import { IProduct } from '../shared/models/IProduct';
import { ShopService } from './shop.service';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products:IProduct[];
  brands:IBrand[];
  types:IType[];
  shopParams = new ShopParams();
  totalCount : number;
  sortOptions = [
    {name:'Alphabetical',value:'name'},
    {name:'Price: Low to High',value:'priceAsc'},
    {name:'Price: High to Low',value:'priceDesc'}
  ];

  constructor(private shopService : ShopService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe(
      response =>{
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
        console.log(this.products);
        console.log(response);
        console.log(this.totalCount);
      },
      err =>{
        console.log(err);
      }
    );
  }
  getBrands(){
    this.shopService.getBrands().subscribe(
      response =>{
        var firstItem = {id:0, name:'All'}
        this.brands = [firstItem,...response];
      },
      err =>{
        console.log(err);
      }
    );
  }

  getTypes(){
    this.shopService.getTypes().subscribe(
      response =>{
        var firstItem = {id:0, name:'All'}
        this.types = [firstItem,...response];
      },
      err =>{
        console.log(err);
      }
    );
  }
  onBrandSelected(brandId:number){
    this.shopParams.brandId = brandId;
    this.getProducts();
  }
  onTypeSelected(typeId : number){
    this.shopParams.typeId = typeId;
    this.getProducts();
  }
  onSortSelected(sort : string){
    this.shopParams.sort = sort;
    this.getProducts();
  }
  onPageChanged(event : any){
   this.shopParams.pageNumber = event.page;
   this.getProducts();
  }

}

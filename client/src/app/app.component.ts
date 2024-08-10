import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/IProduct';
import { IPagination } from './models/IPagination';

@Component({
  selector: 'app-first',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E-Ticaret';
  products: IProduct[];

  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get('https://localhost:44381/api/products')
             .subscribe(
              (response:IPagination)=>{
                this.products = response.data;
              },
              error =>{
              console.log(error);
              }
          );
  }
}

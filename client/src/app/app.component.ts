import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-first',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'E-Ticaret';

  constructor(private basketService : BasketService){}
  ngOnInit(): void {
    const basketId  = localStorage.getItem('basket_id');
    if(basketId){
      this.basketService.getBasket(basketId).subscribe(()=>{
        console.log('initialized basket');
      },error =>{
        console.log(error);
      });
    }
   }
}

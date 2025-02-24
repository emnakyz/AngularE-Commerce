import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket.service';
import { Basket, IBasket } from '../shared/models/basket';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basket$ : Observable<IBasket>;
  basket : Basket;

  constructor(private basketService : BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
    this.basket$.subscribe(response => {
      this.basket  = response;
      console.log("Subscribe Log",this.basket);
    })
  }

}

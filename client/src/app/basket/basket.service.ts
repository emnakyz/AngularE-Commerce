import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProduct } from '../shared/models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: string){
    return this.http.get(this.baseUrl + 'basket?id=' + id)
      .pipe(
        map((basket: IBasket) => {
          this.basketSource.next(basket);
        })
      );
   }

   setBasket(basket: IBasket){
     return this.http.post(this.baseUrl + 'basket', basket)
     .subscribe((response: IBasket) => {
        this.basketSource.next(response);
        console.log(response);
     },error =>{
        console.log(error);
     });
   }

   getCurrentBasketValue(){
     return this.basketSource.value;
   }

   addItemToBasket(item : IProduct, quantity = 1){
      const itemToAdd : IBasketItem = this.mapProductItemToBasketItem(item, quantity);
      const basket = this.getCurrentBasketValue() ?? this.createBasket();
      basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
      this.setBasket(basket);
    }

  private addOrUpdateItem(items: IBasketItem[],
                         itemToAdd: IBasketItem,
                         quantity: number): IBasketItem[]
  {
      const index = items.findIndex(i => i.id === itemToAdd.id);
      if(index === -1){
        items.push(itemToAdd);
      }
      else{
        items[index].quantity += quantity;
      }
      return items;
  }

   private createBasket(): IBasket
   {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
   }

   private mapProductItemToBasketItem(item: IProduct,
                                      quantity: number): IBasketItem
    {
    return {
      id: item.id,
      productName : item.name,
      price : item.price,
      pictureUrl : item.pictureUrl,
      quantity,
      brand:item.productBrand,
      type : item.productType
    }
  }


}

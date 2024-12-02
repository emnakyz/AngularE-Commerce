import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { TestErrorComponent } from './core/test-error/test-error.component';

const routes: Routes = [
  {path:'',component:HomeComponent,data:{breadcrumb:'Ana Sayfa'}},
  {path:'test-error',component:TestErrorComponent,data:{breadcrumb:'Test Errors'}},
  {path:'server-error',component:ServerErrorComponent,data:{breadcrumb:'Server Error'}},
  {path:'not-found',component:NotFoundComponent,data:{breadcrumb:'Not Found'}},
  {path:'shop',component:ShopComponent,data:{breadcrumb:'shop'}},
  {path:'shop/:id',component:ProductDetailsComponent,data:{breadcrumb:{alias:'shopDetail'}}},
  {path:'**',redirectTo:'',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

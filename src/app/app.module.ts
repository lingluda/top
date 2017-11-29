import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductComponent } from './product/product.component';
import { StarsComponent } from './stars/stars.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from "@angular/router";
import { ProductService} from "./shared/product.service";
import { LoginComponent } from './login/login.component';
import {HttpModule} from "@angular/http";
import { RegistComponent } from './regist/regist.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductAddComponent } from './product-add/product-add.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SlipeComponent } from './slipe/slipe.component';
import { CartComponent } from './component/cart/cart.component';


const routeConfig:Routes =[
  {path:'',component:HomeComponent},
  {path:'product/:productId',component:ProductDetailComponent},
  {path:'login',component:LoginComponent},
  {path:'regist',component:RegistComponent},
  {path:'manage',component:ProductManageComponent},
  {path:'add',component:ProductAddComponent},
  {path:'edit/:pid',component:ProductEditComponent},
  {path:'cart',component:CartComponent},
]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SearchComponent,
    CarouselComponent,
    ProductComponent,
    StarsComponent,
    ProductDetailComponent,
    HomeComponent,
    LoginComponent,
    RegistComponent,
    ProductManageComponent,
    ProductAddComponent,
    ProductEditComponent,
    SlipeComponent,
    CartComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
   // { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

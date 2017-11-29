import { Component, OnInit } from '@angular/core';
import {Product, ProductService} from "../shared/product.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product:Observable<Product[]>;
  private imgUrl ='http://placehold.it/200x150';

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.product= this.productService.getProducts();
        console.log('lld');
        this.productService.searchEvent.subscribe(
          params => this.product = this.productService.search(params)
        );
  }
}


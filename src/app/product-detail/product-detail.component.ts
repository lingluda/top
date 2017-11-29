import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product, ProductService,Comment} from "../shared/product.service";


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product1:Product;
  comments:Comment[];
  //productTitle:string;
  constructor(private routeInfo:ActivatedRoute,
                private productService:ProductService
              ) { }

  ngOnInit() {
    let productId:number = this.routeInfo.snapshot.params["productId"];
   // this.productTitle = this.routeInfo.snapshot.params["prodTitle"];
   // this.product = this.productService.getProduct(productId);
   // this.comments = this.productService.getCommentsForProductId(productId);
    this.productService.getProduct(productId).subscribe(
      product =>this.product1 = product
    );
    this.productService.getCommentsForProductId(productId).subscribe(
      comments =>this.comments = comments
    )
  }

}

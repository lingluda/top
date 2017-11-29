import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  search:FormGroup;
  constructor(private productService:ProductService) {
    let fb =new FormBuilder();
    this.search = fb.group({
      name:[null]
    })
  }

  ngOnInit() {
  }
  onSearch(){
    console.log(this.search.value);

    this.productService.searchEvent.emit(this.search.value);
  }
}

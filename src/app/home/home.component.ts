import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { __param } from 'tslib';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private productService : ProductService){}

  products : Product[] =[];
  totalPage :number=0;
  rows:number = 4;

  onProductOutput(product :Product){
    console.log(product, 'Output')
  }
  onPageChnage(event:any){
      this.fetchProducts(event.page , event.rows)
  }

  fetchProducts(page:number , perPage : number){
    this.productService.getProducts('http://localhost:3000/clothes',{page,perPage})
    .subscribe((products : Products)=>{
      this.products = products.items;
      this.totalPage = products.total;
    })
  }
  ngOnInit(): void {
     this.fetchProducts(0,this.rows);
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { __param } from 'tslib';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private productService : ProductService){}

  products : Product[] =[];

  ngOnInit(): void {
      this.productService
      .getProducts('http://localhost:3000/clothes',{page: 0, perPage:8})
      .subscribe((products : Products)=>{
          this.products = products.items;
      })
  }
}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ProductService } from '../services/product.service';
import { __param } from 'tslib';
import { Products } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor(private productService : ProductService){}

  ngOnInit(): void {
      this.productService
      .getProducts('http://localhost:3000/clothes',{page: 0, perPage:5})
      .subscribe((product : Products)=>{
          console.log(product.items)
      })
  }
}

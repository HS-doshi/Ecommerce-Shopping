import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../services/product.service';
import { __param } from 'tslib';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    FormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductService) {}

  products: Product[] = [];
  totalPage: number = 0;
  rows: number = 4;
  displayEdit: boolean = false;
  displayAdd: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEdit = true;
  }

  toggleDeletePopup(product: Product) {
    // this.selectedProduct = product;
    this.deletProduct(product.id ?? 0);
  }
  toggleAddPopup() {
    this.displayAdd = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id ?? 0);
    this.displayEdit = false;
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }
  onPageChnage(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  // .subscribe((products : Products)=>{
  //   this.products = products.items;
  //   this.totalPage = products.total;
  // })

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalPage = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  editProduct(product: Product, id: number) {
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, { product })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => console.log(error),
      });
    console.log(product, 'Edit :');
  }
  deletProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  addProduct(product: Product) {
    this.productService
      .addProduct(`http://localhost:3000/clothes`, { product })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }
}

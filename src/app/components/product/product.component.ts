import { Component, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../types';
import {RatingModule} from 'primeng/rating'
import { FormsModule } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule,PaginatorModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit {
  @Input() product!: Product;
  @Output() productOutput : EventEmitter<Product> = new EventEmitter<Product>


  ngOnInit(): void {
    this.productOutput.emit(this.product)
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Options, PaginationParams, Product, Products } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  response : Options[] =[];
  constructor(private apiService : ApiService) {}

  // getProducts(){
  //   this.apiService.get<Options>('products')
  //   .subscribe((data)=>{
  //     this.response  = data
  //   },error=>{console.log(error)}
  //   )
  // }
  getProducts = (url:string,params :PaginationParams)
  :Observable<Products> =>{
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  }
}

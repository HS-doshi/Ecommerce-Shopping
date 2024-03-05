import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Options } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  constructor(private httpClient : HttpClient) {}

   // any is not good to use so created types.ts file.
   get<T>(url:string , option:Options):Observable<T>{
      return this.httpClient.get<T>(url,option) as Observable<T>;
   }
   ngOnInit(): void {

   }
}

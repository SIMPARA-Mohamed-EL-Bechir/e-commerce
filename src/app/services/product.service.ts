import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { 
  }

  getProducts(): Observable<any>{
    return this.http.get('https://dummyjson.com/products')
  }

  getProductBycategory(): Observable<any>{
    return this.http.get('https://dummyjson.com/products')

  }

  getProductBykey(text : string){
    return this.http.get(`https://dummyjson.com/products/search?q=${text}`)
  }

  getProductById(id: number): Observable<product> {
    return this.http.get<product>(`https://dummyjson.com/products/${id}`);
  }

  
}

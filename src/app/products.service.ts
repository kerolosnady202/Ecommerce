import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpclient:HttpClient) { }
  getProducts(pageNum:number=1):Observable<any>{
    return this._httpclient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`)
  }
  getProductDetails(id:string):Observable<any>{
    return this._httpclient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  getCategories():Observable<any>{
    return this._httpclient.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
}

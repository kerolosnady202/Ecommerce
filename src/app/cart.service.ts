import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  tokenData:any={
    token:localStorage.getItem('userToken'),
   }

  Numofcart=new BehaviorSubject(0)
  constructor(private _httpclient:HttpClient) {
    this.getLoggedUserCart().subscribe({
      next:(response)=>this.Numofcart.next(response.numOfCartItems)

    })

  }
  addToCart(prodId:string):Observable<any>{
   return this._httpclient.post("https://ecommerce.routemisr.com/api/v1/cart",{'productId':prodId})
  }
  getLoggedUserCart():Observable<any>{
   return this._httpclient.get("https://ecommerce.routemisr.com/api/v1/cart")
  }
  removeCartItem(prodId:string):Observable<any>{
   return this._httpclient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`)
  }
  updataItemCount(prodId:string ,count:number):Observable<any>{
   return this._httpclient.put(`https://ecommerce.routemisr.com/api/v1/cart/${prodId}`,{count:count})
  }
  onlinePayment(shippingAddress:any , cartId:string){
    return this._httpclient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      shippingAddress:shippingAddress
    })
  }
  getAllorder(userid:number){
    return this._httpclient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userid}`)
  }
}

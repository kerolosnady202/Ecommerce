import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishService {
   wishNum=new BehaviorSubject(0)
  constructor(private _httpclient:HttpClient) {
    this.getallwishlist().subscribe({
      next:(res:any)=>{
        this.wishNum.next(res.count)
      }
    })
   }
  getallwishlist(){
   return this._httpclient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }
  addTowish(wishId:string){
    return this._httpclient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{'productId':wishId})
  }
  deletefromwish(wishId:string){
    return this._httpclient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${wishId}`)
  }
}

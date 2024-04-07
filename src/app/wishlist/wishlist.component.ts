import { Component } from '@angular/core';
import { WishService } from '../wish.service';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlist:any[]=[]

   constructor(private _wish:WishService ,private _cartservice:CartService , private _toastr:ToastrService ){
   }
   ngOnInit(): void {
     this._wish.getallwishlist().subscribe({
      next:(res:any)=>{
        console.log(res?.data)
        this.wishlist=res?.data
      },
      error:(err)=>{console.log(err)}
    })
   }
   removeFromWish(wishId:string){
    this._wish.deletefromwish(wishId).subscribe({
      next:(res:any)=>{
        if (res.status === 'success') {
          this._toastr.info(res.message,'',{
            timeOut:1000,
            progressBar:true,
           progressAnimation:"increasing",
          })
          this.wishlist = this.wishlist.filter((item)=>{
           return res.data.includes(item._id)
          })
          this._wish.wishNum.next(this.wishlist.length)
        }
      },
      error:(err)=>{console.log(err)}
    })
   }
   addToCart(productId:string){
    this._cartservice.addToCart(productId).subscribe({
      next:(response)=>{
        this._cartservice.Numofcart.next(response.numOfCartItems)
        if (response.status == "success") {
          this._toastr.success(response.message);
        }
      },
      error:(err)=>console.log(err)

    })
  }
}

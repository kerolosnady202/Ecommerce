import { Component } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishService } from '../wish.service';

@Component({
  selector: 'app-featureproduct',
  templateUrl: './featureproduct.component.html',
  styleUrls: ['./featureproduct.component.css']
})
export class FeatureproductComponent {
  products:Product[]=[]
  searchword:string=""
  wishlist:any[]=[]
  wishlistid:any[]=[]
  constructor(
    private _ProductService:ProductsService ,
    private _cartservice:CartService,
    private _toastr:ToastrService ,
    private _wish:WishService,
    ){}
    pageSize:number=1;
    currentPage:number=1;
    total:number=1

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(response)=>{
        this.products=response.data
        this.pageSize=response.metadata.limit
        this.currentPage=response.metadata.currentpage
        this.total=response.results
      console.log(response)
      }
    })
    this._wish.getallwishlist().subscribe({
      next:(res:any)=>{
        console.log(res.data)
        this.wishlistid=res.data.map((item:any)=>item._id)
      },
      error:(err)=>{console.log(err)}
    })

  }
  changePage(pageNum:any){
    this.currentPage=pageNum /* very inportant to show change in pagination in html */
    this._ProductService.getProducts(pageNum).subscribe({
      next:(response)=>{
        this.products=response.data
      /*   this.pageSize=response.metadata.limit */
        /* this.currentPage=response.metadata.currentpage */
        /* this.total=response.results */
      }
    })
  }
  addTowish(prodId:string){
    this._wish.addTowish(prodId).subscribe({
      next:(res:any)=>{
        if (res.status === 'success') {
          this._toastr.info(res.message,'',{
            timeOut:1000,
            progressBar:true,
           progressAnimation:"increasing",
          })
         this.wishlistid=res.data
          this._wish.wishNum.next(this.wishlistid.length)
        }
      },
      error:(err)=>{console.log(err)}
    })

  }
  removeFromcart(prodId:string){
    this._wish.deletefromwish(prodId).subscribe({
      next:(res:any)=>{
        if (res.status === 'success') {
          this._toastr.info(res.message,'',{
            timeOut:1000,
            progressBar:true,
           progressAnimation:"increasing",
          })
         this.wishlistid=res.data
          this._wish.wishNum.next(this.wishlistid.length)
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

/*   getNumberArray(n: number): number[] {
    n=Math.floor(n)
    return Array.from({ length: n }, (_, index) => index + 1);
  } */

}

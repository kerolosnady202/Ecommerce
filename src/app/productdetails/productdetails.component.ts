import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr';
ToastrService
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent {
  idNumber:string = ''
  productDetails:any={}
  constructor(private _activtedRoute:ActivatedRoute ,private _product:ProductsService ,private _router:Router
     ,private _cartservice:CartService , private _toastr:ToastrService){ }
  ngOnInit(): void {
    this._activtedRoute.params.subscribe((param)=>{
      this.idNumber = param['id']
  })
  this._product.getProductDetails(this.idNumber).subscribe({
    next:(response)=>{this.productDetails = response.data}})
  }
  backToHome(){
   this._router.navigate(['/home'])
  }
  getNumberArray(n: number): number[] {
    n=Math.floor(n)
    return Array.from({ length: n }, (_, index) => index + 1);
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplaySpeed: 1000,
    autoplayTimeout: 2000,
    navSpeed: 1000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }


}



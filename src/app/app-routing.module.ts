import { BrandsComponent } from './brands/brands.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CartComponent } from './cart/cart.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CategoriesComponent } from './categories/categories.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllorderComponent } from './allorder/allorder.component';
import { WishlistComponent } from './wishlist/wishlist.component';


const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:HomeComponent,canActivate:[authGuard] },
  {path:"about",component:AboutComponent,canActivate:[authGuard]},
  {path:"cart",component:CartComponent,canActivate:[authGuard]},
  {path:"categories",component:CategoriesComponent,canActivate:[authGuard]},
  {path:"productdetails/:id",component:ProductdetailsComponent,canActivate:[authGuard]},
  {path:"brands",component:BrandsComponent,canActivate:[authGuard]},
  {path:"checkout",component:CheckoutComponent,canActivate:[authGuard]},
  {path:"allorders",component:AllorderComponent,canActivate:[authGuard]},
  {path:"wish",component:WishlistComponent,canActivate:[authGuard]},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:'setting',loadChildren:()=>import('./setting/setting.module').then((m)=>m.SettingModule)},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

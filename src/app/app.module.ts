import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BrandsComponent } from './brands/brands.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './slider/slider.component';
import { CutPipe } from './cut.pipe';
import { FeatureproductComponent } from './featureproduct/featureproduct.component';
import { SearchPipe } from './search.pipe'
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './checkout/checkout.component';
import { AllorderComponent } from './allorder/allorder.component';
import { HeaderInterceptor } from './header.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './loading.interceptor';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NgxPaginationModule } from 'ngx-pagination';
ToastrModule
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    NotfoundComponent,
    FooterComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    ProductdetailsComponent,
    SliderComponent,
    CutPipe,
    FeatureproductComponent,
    SearchPipe,
    CheckoutComponent,
    AllorderComponent,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxPaginationModule,
    NgxSpinnerModule.forRoot({ type: 'square-jelly-box' }),
    ToastrModule.forRoot({
      timeOut:1000,
      progressBar:true,
      progressAnimation:"increasing",
      preventDuplicates:true,
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HeaderInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

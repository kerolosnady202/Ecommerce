import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private _render:Renderer2){

  }
/*   changeColor(event:any){
   console.log(event.target.dataset.color)
   console.log()
   this._render.setStyle(document.querySelector(":root"),'--main-color',`red`)

  } */

  @ViewChild ("go") go!:ElementRef;
  @HostListener('window : scroll')
 onscroll():void{
  if (window.scrollY > 600) {
     this._render.removeClass(this.go.nativeElement, 'hide')
    }else{
    this._render.addClass(this.go.nativeElement, 'hide')
  }
 }
 goUp(){
  scrollTo(0,0)
 }

}


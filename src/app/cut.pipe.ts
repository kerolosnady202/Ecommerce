import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cut'
})
export class CutPipe implements PipeTransform {

  transform(productDescription:string , limit:number): string {
    return productDescription.split(' ').slice(0,limit).join(' ')
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], searchWord:string): Product[] {
    return products.filter((prod)=>prod.title.toLocaleLowerCase().includes(searchWord.toLocaleLowerCase()))
  }

}

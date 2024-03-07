import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true
})
export class PricePipe implements PipeTransform {

  transform(value: string, maxLength : number=16, ellipsis : string = "..."): any {
    // prepanf a ruppes sign.
      if(value.length > maxLength){
        return value.slice(0,maxLength) + ellipsis;
      }
      return `${value}₹`;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxLength : number=16 ,ellipse : string ='...'): unknown {
    if(value.length > maxLength){
      return value + ellipse;
    }
    return value
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(values: any[], orderBy: string = 'ASC', sortProperty:string ='age'): any {
    values.sort(
      (a, b) => {
        if(a[sortProperty]==b[sortProperty]){
          return 0;
        }
        else if(a[sortProperty]>b[sortProperty]){
          return 1;
        }
        return -1
      }
    );

    if (orderBy === 'DESC') {
      values.reverse();
    }

    return values;
  }

}

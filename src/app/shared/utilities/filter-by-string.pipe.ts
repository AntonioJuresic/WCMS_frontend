import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByString'
})
export class FilterByStringPipe implements PipeTransform {

    transform(items: any[], field: string, value: string): any[] {
        if (!items || !value || !field) {
            return items;
        }
        return items.filter(item => item[field].toLowerCase().includes(value.toLowerCase()));
    }

}
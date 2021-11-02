import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

    transform(val: string, length: number): string {
        return val.length > length ? `${val.substring(0, length)} ...` : val
    }

}

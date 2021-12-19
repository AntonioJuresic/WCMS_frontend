import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml'
})
export class SafeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    transform(style: undefined | string | String) {
        if(style == undefined || style.length == 0 || style.length.valueOf() == 0) {
            return "";
        }
        
        if (style instanceof String) {
            return this.sanitizer.bypassSecurityTrustHtml(style.valueOf());
        }

        return this.sanitizer.bypassSecurityTrustHtml(style);
        //return this.sanitizer.bypassSecurityTrustStyle(style);
        // return this.sanitizer.bypassSecurityTrustXxx(style); - see docs
    }
}
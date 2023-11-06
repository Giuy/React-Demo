import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Finds an object from given source using the given key - value pairs
 */
@Pipe({
    name: 'safeHtml',
    pure: false
})
export class GrexSafeHtmlPipe implements PipeTransform
{
    /**
     * Constructor
     */
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(content): any
    {
      return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}

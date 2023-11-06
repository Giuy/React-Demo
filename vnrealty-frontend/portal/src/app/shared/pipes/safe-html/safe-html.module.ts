import { NgModule } from '@angular/core';
import { GrexSafeHtmlPipe } from './safe-html.pipe';

@NgModule({
    declarations: [
        GrexSafeHtmlPipe
    ],
    exports     : [
        GrexSafeHtmlPipe
    ]
})
export class GrexSafeHtmlPipeModule
{
}

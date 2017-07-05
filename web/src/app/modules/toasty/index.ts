import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
export * from './toasty.service';
export * from './toasty.component';

import { ToastyComponent } from './toasty.component';
import { ToastComponent } from './toast.component';
import { SafeHtmlPipe } from './shared';
import { ToastyService, ToastyConfig, toastyServiceFactory } from './toasty.service';

export let providers = [
    ToastyConfig,
    { provide: ToastyService, useFactory: toastyServiceFactory, deps: [ToastyConfig] }
];

@NgModule({
    imports: [CommonModule],
    declarations: [ToastComponent, ToastyComponent, SafeHtmlPipe],
    exports: [ ToastComponent, ToastyComponent],
    providers: providers
})
export class ToastyModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ToastyModule,
            providers: providers
        };
    }
}

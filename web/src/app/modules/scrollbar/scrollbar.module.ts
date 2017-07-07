import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollbarDirective } from './scrollbar.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ScrollbarDirective
  ],
  declarations: [ScrollbarDirective]
})
export class ScrollbarModule { }

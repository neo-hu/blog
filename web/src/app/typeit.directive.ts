import {Directive, OnInit, OnDestroy, Input, ElementRef} from '@angular/core';
import TypeIt from 'typeit';

@Directive({
  selector: '[appTypeit]'
})
export class TypeitDirective implements OnInit, OnDestroy {
  @Input('appTypeit')
  text;
  @Input('pause')
  pause = 0;
  instance;

  constructor(private el: ElementRef) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.instance = new TypeIt(this.el.nativeElement, {
      //-- Other options...
    }).pause(this.pause)
      .type(this.text).go();
  }

}

import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { ToastData } from './toasty.service';
import { isFunction } from './toasty.utils';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'ng2-toast',
  template: `<div class="toast" [ngClass]="[toast.type, toast.theme]">
    <div *ngIf="toast.showClose" class="close-button" (click)="close($event)"></div>
    <div *ngIf="toast.title || toast.msg" class="toast-text" (click)="click()">
        <span *ngIf="toast.title" class="toast-title" [innerHTML]="toast.title | safeHtml"></span>
        <br *ngIf="toast.title && toast.msg" />
        <pre *ngIf="toast.msg" class="toast-msg" [innerHtml]="toast.msg | safeHtml"></pre>
    </div>
</div>
`,
  encapsulation: ViewEncapsulation.None
})
export class ToastComponent {

  @Input() toast: ToastData;
  @Output('closeToast') closeToastEvent = new EventEmitter();

  /**
   * Event handler invokes when user clicks on close button.
   * This method emit new event into ToastyContainer to close it.
   */
  click() {
    if (this.toast.onClick && isFunction(this.toast.onClick)) {
      this.toast.onClick.call(this, this.toast);
    }
  }
  close($event: any) {
    $event.preventDefault();
    this.closeToastEvent.next(this.toast);
  }
}

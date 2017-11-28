"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var toasty_utils_1 = require("./toasty.utils");
/**
 * A Toast component shows message with title and close button.
 */
var ToastComponent = (function () {
    function ToastComponent() {
        this.closeToastEvent = new core_1.EventEmitter();
    }
    /**
     * Event handler invokes when user clicks on close button.
     * This method emit new event into ToastyContainer to close it.
     */
    ToastComponent.prototype.click = function () {
        if (this.toast.onClick && toasty_utils_1.isFunction(this.toast.onClick)) {
            this.toast.onClick.call(this, this.toast);
        }
    };
    ToastComponent.prototype.close = function ($event) {
        $event.preventDefault();
        this.closeToastEvent.next(this.toast);
    };
    return ToastComponent;
}());
__decorate([
    core_1.Input()
], ToastComponent.prototype, "toast", void 0);
__decorate([
    core_1.Output('closeToast')
], ToastComponent.prototype, "closeToastEvent", void 0);
ToastComponent = __decorate([
    core_1.Component({
        selector: 'ng2-toast',
        template: "<div class=\"toast\" [ngClass]=\"[toast.type, toast.theme]\">\n    <div *ngIf=\"toast.showClose\" class=\"close-button\" (click)=\"close($event)\"></div>\n    <div *ngIf=\"toast.title || toast.msg\" class=\"toast-text\" (click)=\"click()\">\n        <span *ngIf=\"toast.title\" class=\"toast-title\" [innerHTML]=\"toast.title | safeHtml\"></span>\n        <br *ngIf=\"toast.title && toast.msg\" />\n        <pre *ngIf=\"toast.msg\" class=\"toast-msg\" [innerHtml]=\"toast.msg | safeHtml\"></pre>\n    </div>\n</div>\n",
        encapsulation: core_1.ViewEncapsulation.None
    })
], ToastComponent);
exports.ToastComponent = ToastComponent;

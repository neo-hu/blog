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
var toasty_service_1 = require("./toasty.service");
/**
 * Toasty is container for Toast components
 */
var ToastyComponent = ToastyComponent_1 = (function () {
    function ToastyComponent(config, toastyService) {
        this.config = config;
        this.toastyService = toastyService;
        this._position = '';
        // The storage for toasts.
        this.toasts = [];
        // Initialise position
        this.position = '';
    }
    Object.defineProperty(ToastyComponent.prototype, "position", {
        get: function () {
            return this._position;
        },
        // The window position where the toast pops up. Possible values:
        // - bottom-right (default value from ToastConfig)
        // - bottom-left
        // - top-right
        // - top-left
        // - top-center
        // - bottom-center
        // - center-center
        set: function (value) {
            if (value) {
                var notFound = true;
                for (var i = 0; i < ToastyComponent_1.POSITIONS.length; i++) {
                    if (ToastyComponent_1.POSITIONS[i] === value) {
                        notFound = false;
                        break;
                    }
                }
                if (notFound) {
                    // Position was wrong - clear it here to use the one from config.
                    value = this.config.position;
                }
            }
            else {
                value = this.config.position;
            }
            this._position = 'toasty-position-' + value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
     * first time, and before any of its children have been checked. It is invoked only once when the
     * directive is instantiated.
     */
    ToastyComponent.prototype.ngOnInit = function () {
        var _this = this;
        // We listen events from our service
        this.toastyService.events.subscribe(function (event) {
            if (event.type === toasty_service_1.ToastyEventType.ADD) {
                // Add the new one
                var toast = event.value;
                _this.add(toast);
            }
            else if (event.type === toasty_service_1.ToastyEventType.CLEAR_TIMEOUT) {
                var id_1 = event.value;
                if (id_1) {
                    var toasty_1;
                    _this.toasts.forEach(function (value, key) {
                        if (value.id === id_1) {
                            toasty_1 = value;
                            _this._setTimeout(toasty_1);
                            return false;
                        }
                    });
                }
                else {
                    throw new Error('Please provide id of Toast to close');
                }
            }
            else if (event.type === toasty_service_1.ToastyEventType.CLEAR) {
                // Clear the one by number
                var id = event.value;
                _this.clear(id);
            }
            else if (event.type === toasty_service_1.ToastyEventType.CLEAR_ALL) {
                // Lets clear all toasts
                _this.clearAll();
            }
        });
    };
    /**
     * Event listener of 'closeToast' event comes from ToastyComponent.
     * This method removes ToastComponent assosiated with this Toast.
     */
    ToastyComponent.prototype.closeToast = function (toast) {
        this.clear(toast.id);
    };
    ToastyComponent.prototype._pop = function () {
        var t_len = this.toasts.length;
        while (t_len >= this.config.limit) {
            var toast = void 0;
            var wait = false;
            for (var i = 0; i < this.toasts.length; i++) {
                toast = this.toasts[i];
                if (toast.type != "toasty-type-wait") {
                    t_len -= 1;
                    wait = true;
                    this.toasts.splice(i, 1);
                    break;
                }
            }
            if (!wait) {
                break;
            }
        }
    };
    /**
     * Add new Toast
     */
    ToastyComponent.prototype.add = function (toast) {
        // If we've gone over our limit, remove the earliest
        // one from the array
        this._pop();
        // Add toasty to array
        this.toasts.push(toast);
        //
        // If there's a timeout individually or globally,
        // set the toast to timeout
        if (toast.timeout > 0) {
            this._setTimeout(toast);
        }
    };
    /**
     * Clear individual toast by id
     * @param id is unique identifier of Toast
     */
    ToastyComponent.prototype.clear = function (id) {
        var _this = this;
        if (id) {
            this.toasts.forEach(function (value, key) {
                if (value.id === id) {
                    if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                        value.onRemove.call(_this, value);
                    }
                    _this.toasts.splice(key, 1);
                }
            });
        }
        else {
            throw new Error('Please provide id of Toast to close');
        }
    };
    /**
     * Clear all toasts
     */
    ToastyComponent.prototype.clearAll = function () {
        var _this = this;
        this.toasts.forEach(function (value, key) {
            if (value.onRemove && toasty_utils_1.isFunction(value.onRemove)) {
                value.onRemove.call(_this, value);
            }
        });
        this.toasts = [];
    };
    /**
     * Custom setTimeout function for specific setTimeouts on individual toasts.
     */
    ToastyComponent.prototype._setTimeout = function (toast) {
        var _this = this;
        window.setTimeout(function () {
            _this.clear(toast.id);
        }, toast.timeout);
    };
    return ToastyComponent;
}());
/**
 * Set of constants defins position of Toasty on the page.
 */
ToastyComponent.POSITIONS = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center', 'center-center'];
__decorate([
    core_1.Input()
], ToastyComponent.prototype, "position", null);
ToastyComponent = ToastyComponent_1 = __decorate([
    core_1.Component({
        selector: 'ng2-toasty',
        template: " <div id=\"toasty\" [ngClass]=\"[position]\">\n      <ng2-toast *ngFor=\"let toast of toasts\" [toast]=\"toast\" (closeToast)=\"closeToast(toast)\"></ng2-toast>\n    </div>\n    ",
        styleUrls: ['./style.css'],
        encapsulation: core_1.ViewEncapsulation.None
    })
], ToastyComponent);
exports.ToastyComponent = ToastyComponent;
var ToastyComponent_1;

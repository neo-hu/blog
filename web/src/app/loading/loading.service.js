"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var loading_utils_1 = require("./loading.utils");
var Subject_1 = require("rxjs/Subject");
var LoadingBarEventType;
(function (LoadingBarEventType) {
    LoadingBarEventType[LoadingBarEventType["PROGRESS"] = 0] = "PROGRESS";
    LoadingBarEventType[LoadingBarEventType["HEIGHT"] = 1] = "HEIGHT";
    LoadingBarEventType[LoadingBarEventType["COLOR"] = 2] = "COLOR";
    LoadingBarEventType[LoadingBarEventType["VISIBLE"] = 3] = "VISIBLE";
})(LoadingBarEventType = exports.LoadingBarEventType || (exports.LoadingBarEventType = {}));
var LoadingBarEvent = (function () {
    function LoadingBarEvent(type, value) {
        this.type = type;
        this.value = value;
    }
    return LoadingBarEvent;
}());
exports.LoadingBarEvent = LoadingBarEvent;
var LoadingBarService = (function () {
    function LoadingBarService() {
        this._progress = 0;
        this._height = '2px';
        this._color = 'firebrick';
        this._visible = true;
        this._incTimeout = 0;
        this.interval = 500; // in milliseconds
        this.icount = 0;
        this.dcount = 0;
        this.eventSource = new Subject_1.Subject();
        this.events = this.eventSource.asObservable();
    }
    Object.defineProperty(LoadingBarService.prototype, "progress", {
        get: function () {
            return this._progress;
        },
        set: function (value) {
            if (loading_utils_1.isPresent(value)) {
                if (value > 0) {
                    this.visible = true;
                }
                if (value >= 100) {
                    value = 100;
                }
                this._progress = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingBarService.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (value) {
            if (loading_utils_1.isPresent(value)) {
                this._height = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.HEIGHT, this._height));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingBarService.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            if (loading_utils_1.isPresent(value)) {
                this._color = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.COLOR, this._color));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadingBarService.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (value) {
            if (loading_utils_1.isPresent(value)) {
                this._visible = value;
                this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
            }
        },
        enumerable: true,
        configurable: true
    });
    LoadingBarService.prototype.emitEvent = function (event) {
        if (this.eventSource) {
            // Push up a new event
            this.eventSource.next(event);
        }
    };
    LoadingBarService.prototype.increment = function () {
        this.icount++;
        if (this.icount > 0)
            this._set(this.dcount / this.icount);
    };
    LoadingBarService.prototype.decrement = function () {
        this.dcount++;
        if (this.dcount >= this.icount) {
            this.dcount = this.icount;
            this.complete();
            return;
        }
        if (this.icount > 0)
            this._set(this.dcount / this.icount);
    };
    LoadingBarService.prototype._set = function (value) {
        var _this = this;
        this.progress = value * 100;
        if (this._incTimeout) {
            clearTimeout(this._incTimeout);
            this._incTimeout = null;
        }
        this._incTimeout = setTimeout(function () {
            _this._inc();
        }, this.interval);
    };
    LoadingBarService.prototype._inc = function () {
        if (this.progress >= 100) {
            return;
        }
        var rnd = 0;
        var stat = this.progress / 100;
        if (stat >= 0 && stat < 0.25) {
            // Start out between 3 - 6% increments
            rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
        }
        else if (stat >= 0.25 && stat < 0.65) {
            // increment between 0 - 3%
            rnd = (Math.random() * 3) / 100;
        }
        else if (stat >= 0.65 && stat < 0.90) {
            // increment between 0 - 2%
            rnd = (Math.random() * 2) / 100;
        }
        else if (stat >= 0.90 && stat < 0.99) {
            // finally, increment it .5 %
            rnd = 0.005;
        }
        else {
            // after 99%, don't increment:
            rnd = 0;
        }
        this._set(stat + rnd);
    };
    // start(onCompleted: Function = null) {
    //   // Stop current timer
    //   this.stop();
    //   // Make it visible for sure
    //   this.visible = true;
    //   // Run the timer with milliseconds iterval
    // }
    //
    // stop() {
    // }
    // reset() {
    //   this.stop();
    //   this.progress = 0;
    // }
    LoadingBarService.prototype.complete = function () {
        var _this = this;
        this.progress = 100;
        this.icount = this.dcount = 0;
        // this.stop();
        setTimeout(function () {
            // Hide it away
            _this.visible = false;
            setTimeout(function () {
                // Drop to 0
                // this.progress = 0;
            }, 250);
        }, 250);
    };
    return LoadingBarService;
}());
LoadingBarService = __decorate([
    core_1.Injectable()
], LoadingBarService);
exports.LoadingBarService = LoadingBarService;

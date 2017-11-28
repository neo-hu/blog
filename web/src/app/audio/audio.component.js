"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var util_1 = require("util");
var AudioEventType;
(function (AudioEventType) {
    AudioEventType[AudioEventType["PAUSE"] = 0] = "PAUSE";
    AudioEventType[AudioEventType["PLAY"] = 1] = "PLAY";
})(AudioEventType = exports.AudioEventType || (exports.AudioEventType = {}));
var AudioService = (function () {
    function AudioService() {
        this.eventSource = new Subject_1.Subject();
        this.events = this.eventSource.asObservable();
        this._stop = true;
    }
    Object.defineProperty(AudioService.prototype, "stop", {
        get: function () {
            return this._stop;
        },
        set: function (s) {
            this._stop = s;
            if (s) {
                this.eventSource.next(AudioEventType.PAUSE);
            }
            else {
                this.eventSource.next(AudioEventType.PLAY);
            }
        },
        enumerable: true,
        configurable: true
    });
    return AudioService;
}());
AudioService = __decorate([
    core_1.Injectable()
], AudioService);
exports.AudioService = AudioService;
var AudioComponent = (function () {
    function AudioComponent(audioService) {
        this.audioService = audioService;
        this.loading = true;
        this.stop = true;
        this.t = 0;
        this.t_step = 1 / 20;
    }
    AudioComponent.prototype.change = function (stop) {
        if (this.loading) {
            return;
        }
        if (util_1.isUndefined(stop)) {
            this.stop = !this.stop;
        }
        else {
            this.stop = stop;
        }
        if (!this.stop) {
            this.audio.nativeElement.play();
            this.loadCanvas();
        }
        else {
            if (this._an) {
                cancelAnimationFrame(this._an);
            }
            this.audio.nativeElement.pause();
        }
        // this.audioService.stop = this.stop;
    };
    AudioComponent.prototype.load = function () {
        var _this = this;
        if (!this.audio.nativeElement.readyState) {
            setTimeout(function () {
                _this.load();
            }, 200);
        }
        else {
            this.loading = false;
            // this.audioService.stop = false;
        }
    };
    AudioComponent.prototype.rand = function (max, min) {
        var b = (max === 0 || max) ? max : 1, a = min || 0;
        return a + (b - a) * Math.random();
    };
    AudioComponent.prototype.loadCanvas = function () {
        var _this = this;
        this.ctx = this.canvas.nativeElement.getContext('2d');
        var self = this;
        this.w = self.canvas.nativeElement.width = self.canvas.nativeElement.offsetWidth;
        this.h = self.canvas.nativeElement.height = self.canvas.nativeElement.offsetHeight;
        addEventListener('resize', function () {
            _this.w = self.canvas.nativeElement.width = self.canvas.nativeElement.offsetWidth;
            _this.h = self.canvas.nativeElement.height = self.canvas.nativeElement.offsetHeight;
        });
        this.animation();
    };
    AudioComponent.prototype.animation = function () {
        var _this = this;
        this.x0 = -1;
        this.y0 = this.h / 2;
        this.ctx.clearRect(0, 0, this.w, this.h);
        var tmp = Math.pow(this.t, 1.75) / 19;
        for (this.x = 0; this.x < this.w; this.x = this.x + 3) {
            this.y = 9 * Math.sqrt(this.x) * Math.sin(this.x / 23 / Math.PI + this.t / 3 + Math.sin(this.x / 29 + this.t)) +
                32 * Math.sin(this.t) * Math.cos(this.x / 19 + this.t / 7) +
                16 * Math.cos(this.t) * Math.sin(Math.sqrt(this.x) + this.rand(3, 2) * tmp) + this.h / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.x0, this.y0);
            this.ctx.lineTo(this.x, this.y);
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = 'hsl(' + (2 * this.x / this.w + this.t) * 180 + ', 100%, 65%)';
            this.ctx.stroke();
            this.x0 = this.x;
            this.y0 = this.y;
        }
        this.t += this.t_step;
        this._an = requestAnimationFrame(function () { return _this.animation(); });
    };
    AudioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.audioService.events.subscribe(function (event) {
            if (event === AudioEventType.PLAY) {
                _this.change(false);
            }
            else if (event === AudioEventType.PAUSE) {
                _this.change(true);
            }
        });
    };
    return AudioComponent;
}());
__decorate([
    core_1.ViewChild('audio')
], AudioComponent.prototype, "audio", void 0);
__decorate([
    core_1.ViewChild('canvas')
], AudioComponent.prototype, "canvas", void 0);
AudioComponent = __decorate([
    core_1.Component({
        selector: '[audio]',
        templateUrl: './audio.component.html',
        styleUrls: ['./audio.component.scss']
    })
], AudioComponent);
exports.AudioComponent = AudioComponent;

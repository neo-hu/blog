"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var progressbar_1 = require("progressbar.js/dist/progressbar");
var CircleProgressComponent = (function () {
    function CircleProgressComponent(themesService) {
        this.themesService = themesService;
    }
    CircleProgressComponent.prototype.ngOnDestroy = function () {
        if (this.bar) {
            this.bar.destroy();
        }
    };
    CircleProgressComponent.prototype.setBar = function () {
        if (this.bar) {
            this.bar.destroy();
        }
        var div = document.createElement('div');
        this.svg.nativeElement.appendChild(div);
        this.bar = new progressbar_1.default.Circle(div, {
            color: '#292b2c',
            strokeWidth: 2,
            trailWidth: 2,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: this.themesService.theme, width: 2 },
            to: { color: this.themesService.theme, width: 2 },
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                    circle.setText('');
                }
                else {
                    circle.setText('<div class=\'text-center\' style=\'font-size: 150%;\'>' + value + '%</div>');
                }
            }
        });
        this.bar.text.style.fontFamily = '\'Raleway\', Helvetica, sans-serif';
        this.bar.text.style.fontSize = '1rem';
        this.bar.animate(this.progress / 100);
    };
    CircleProgressComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.setBar();
        this.themesService.events.subscribe(function (t) {
            _this.setBar();
        });
    };
    return CircleProgressComponent;
}());
__decorate([
    core_1.Input('circle-progress')
], CircleProgressComponent.prototype, "progress", void 0);
__decorate([
    core_1.ViewChild('svg')
], CircleProgressComponent.prototype, "svg", void 0);
CircleProgressComponent = __decorate([
    core_1.Component({
        selector: '[circle-progress]',
        templateUrl: './circle-progress.component.html',
        styleUrls: ['./circle-progress.component.scss']
    })
], CircleProgressComponent);
exports.CircleProgressComponent = CircleProgressComponent;

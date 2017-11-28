"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var loading_service_1 = require("./loading.service");
var loading_utils_1 = require("./loading.utils");
var LoadingComponent = (function () {
    function LoadingComponent(service) {
        this.service = service;
        this.progress = '0';
        this.color = 'firebrick';
        this.height = '2px';
        this.show = true;
    }
    LoadingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.service.events.subscribe(function (event) {
            setTimeout(function () {
                if (event.type === loading_service_1.LoadingBarEventType.PROGRESS && loading_utils_1.isPresent(event.value)) {
                    _this.progress = event.value;
                }
                else if (event.type === loading_service_1.LoadingBarEventType.COLOR) {
                    _this.color = event.value;
                }
                else if (event.type === loading_service_1.LoadingBarEventType.HEIGHT) {
                    _this.height = event.value;
                }
                else if (event.type === loading_service_1.LoadingBarEventType.VISIBLE) {
                    _this.show = event.value;
                }
            });
        });
    };
    return LoadingComponent;
}());
__decorate([
    core_1.Input()
], LoadingComponent.prototype, "color", void 0);
__decorate([
    core_1.Input()
], LoadingComponent.prototype, "height", void 0);
__decorate([
    core_1.Input()
], LoadingComponent.prototype, "show", void 0);
LoadingComponent = __decorate([
    core_1.Component({
        selector: 'loading-bar',
        templateUrl: './loading.component.html',
        styleUrls: ['./loading.component.css'],
    })
], LoadingComponent);
exports.LoadingComponent = LoadingComponent;

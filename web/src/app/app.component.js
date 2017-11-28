"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var audio_component_1 = require("./audio/audio.component");
var AppComponent = (function () {
    function AppComponent(router, route, toastyService, themesService, audioService, loader) {
        this.router = router;
        this.route = route;
        this.toastyService = toastyService;
        this.themesService = themesService;
        this.audioService = audioService;
        this.loader = loader;
        this.showMenu = false;
        this.audioStart = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.color = this.themesService.theme;
        this.themesService.events.subscribe(function (theme) { return _this.color = theme; });
        this.audioStart = !this.audioService.stop;
        this.audioService.events.subscribe(function (event) {
            if (event === audio_component_1.AudioEventType.PLAY) {
                _this.audioStart = true;
            }
            else if (event === audio_component_1.AudioEventType.PAUSE) {
                _this.audioStart = false;
            }
        });
        this.router.events
            .subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _this.showMenu = false;
                _this.loader.increment();
            }
            else if (event instanceof router_1.NavigationCancel) {
                _this.loader.decrement();
            }
            else if (event instanceof router_1.NavigationError) {
                _this.loader.decrement();
                _this.toastyService.error({
                    title: 'JS Error',
                    msg: event.error.message,
                    showClose: true
                });
            }
            else if (event instanceof router_1.NavigationEnd) {
                _this.loader.decrement();
            }
        }, function (error) {
            console.log(error);
            _this.loader.decrement();
        });
    };
    AppComponent.prototype.changeAudio = function () {
        this.audioService.stop = !this.audioService.stop;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: '[neo-app-root]',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss'],
        encapsulation: core_1.ViewEncapsulation.None
    })
], AppComponent);
exports.AppComponent = AppComponent;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/filter");
var Subject_1 = require("rxjs/Subject");
var ThemesService = (function () {
    function ThemesService() {
        this.themeSource = new Subject_1.Subject();
        this.events = this.themeSource.asObservable();
    }
    Object.defineProperty(ThemesService.prototype, "theme", {
        get: function () {
            return this._theme;
        },
        set: function (value) {
            this._theme = value;
            this.themeSource.next(value);
        },
        enumerable: true,
        configurable: true
    });
    return ThemesService;
}());
ThemesService = __decorate([
    core_1.Injectable()
], ThemesService);
exports.ThemesService = ThemesService;
var ThemesComponent = (function () {
    function ThemesComponent(cookieService, themesService) {
        this.cookieService = cookieService;
        this.themesService = themesService;
        this.themes = { 'default': '#645b5c', 'r1': '#2b9eb1', 't2': '#ca0d86', 't3': '#e1483f', 't4': '#7de87d' };
        this.cookieKey = 'neo_theme';
    }
    ThemesComponent.prototype.selectTheme = function (key) {
        if (key === 'default') {
            document.body.removeAttribute('theme');
            this.cookieService.remove(this.cookieKey);
        }
        else {
            var date = new Date();
            date.setFullYear(date.getFullYear() + 10);
            var opts = {
                expires: date
            };
            this.cookieService.put(this.cookieKey, key, opts);
            document.body.setAttribute('theme', key);
        }
        this.themesService.theme = this.themes[key];
    };
    ThemesComponent.prototype.ngOnInit = function () {
        var cookieTheme = this.cookieService.get(this.cookieKey);
        if (cookieTheme) {
            this.selectTheme(cookieTheme);
        }
        else {
            this.selectTheme('default');
        }
    };
    return ThemesComponent;
}());
ThemesComponent = __decorate([
    core_1.Component({
        selector: '[themes]',
        templateUrl: './themes.component.html',
        styleUrls: ['./themes.component.scss']
    })
], ThemesComponent);
exports.ThemesComponent = ThemesComponent;

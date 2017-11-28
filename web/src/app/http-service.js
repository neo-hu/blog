"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/finally");
require("rxjs/add/operator/catch");
var HttpService = (function (_super) {
    __extends(HttpService, _super);
    function HttpService(backend, options, loader, toastyService, toastyConfig) {
        var _this = _super.call(this, backend, options) || this;
        _this.loader = loader;
        _this.toastyService = toastyService;
        _this.toastyConfig = toastyConfig;
        _this.toastyConfig.theme = 'bootstrap';
        return _this;
        // this.toastyConfig.theme = 'bootstrap';
    }
    HttpService.prototype.request = function (url, options) {
        this.loader.increment();
        return this.intercept(_super.prototype.request.call(this, url, options));
    };
    HttpService.prototype.intercept = function (observable) {
        var _this = this;
        return observable
            .do(function (res) {
        }, function (err) {
            _this.toastyService.error({
                title: err.statusText,
                msg: err._body,
                showClose: true
            });
        })
            .finally(function () {
            _this.loader.decrement();
        });
    };
    return HttpService;
}(http_1.Http));
HttpService = __decorate([
    core_1.Injectable()
], HttpService);
exports.HttpService = HttpService;
function HttpServiceFactory(backend, defaultOptions, loader, toastyService, toastyConfig) {
    return new HttpService(backend, defaultOptions, loader, toastyService, toastyConfig);
}
exports.HttpServiceFactory = HttpServiceFactory;

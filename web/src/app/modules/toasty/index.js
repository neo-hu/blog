"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
__export(require("./toasty.service"));
__export(require("./toasty.component"));
var toasty_component_1 = require("./toasty.component");
var toast_component_1 = require("./toast.component");
var shared_1 = require("./shared");
var toasty_service_1 = require("./toasty.service");
exports.providers = [
    toasty_service_1.ToastyConfig,
    { provide: toasty_service_1.ToastyService, useFactory: toasty_service_1.toastyServiceFactory, deps: [toasty_service_1.ToastyConfig] }
];
var ToastyModule = ToastyModule_1 = (function () {
    function ToastyModule() {
    }
    ToastyModule.forRoot = function () {
        return {
            ngModule: ToastyModule_1,
            providers: exports.providers
        };
    };
    return ToastyModule;
}());
ToastyModule = ToastyModule_1 = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [toast_component_1.ToastComponent, toasty_component_1.ToastyComponent, shared_1.SafeHtmlPipe],
        exports: [toast_component_1.ToastComponent, toasty_component_1.ToastyComponent],
        providers: exports.providers
    })
], ToastyModule);
exports.ToastyModule = ToastyModule;
var ToastyModule_1;

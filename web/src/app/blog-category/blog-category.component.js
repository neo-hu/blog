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
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/map");
var BlogCategoryComponent = (function () {
    function BlogCategoryComponent(blogService, router, route) {
        this.blogService = blogService;
        this.router = router;
        this.route = route;
    }
    BlogCategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (_) {
            _this.articles = null;
            _this.blogService.getArticles().map(function (r) {
                _this.articles = [];
                return r;
            }).switchMap(function (r) {
                return r.sort(function (a, b) {
                    return b["postdate"] < a["postdate"] ? -1 : 1;
                }).sort(function (a, b) {
                    return b["top"] < a["top"] ? -1 : 1;
                });
            }).filter(function (item) {
                if ("category" in _) {
                    return item.categories && item.categories.indexOf(_["category"]) > -1;
                }
                return true;
            }).subscribe(function (r) { return _this.articles.push(r); });
        });
    };
    return BlogCategoryComponent;
}());
BlogCategoryComponent = __decorate([
    core_1.Component({
        selector: 'app-blog-category',
        templateUrl: './blog-category.component.html',
        styleUrls: ['./blog-category.component.scss']
    })
], BlogCategoryComponent);
exports.BlogCategoryComponent = BlogCategoryComponent;

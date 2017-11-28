"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map");
var util_1 = require("util");
var BlogService = (function () {
    function BlogService(http) {
        this.http = http;
    }
    BlogService.prototype.getArticle = function (_id) {
        return this.http.get("https://neo-hu.github.io/blog/db/" + _id).map(function (response) {
            return response.text();
        });
    };
    BlogService.prototype.getArticles = function () {
        if (util_1.isUndefined(this.articlesObservable)) {
            this.articlesObservable = this.http.get("https://neo-hu.github.io/blog/db/articles.json")
                .map(function (response) { return response.json(); });
        }
        return this.articlesObservable;
    };
    BlogService.prototype.getCategories = function () {
        return this.http.get("https://neo-hu.github.io/blog/db/categories.json")
            .map(function (response) { return response.json(); });
    };
    return BlogService;
}());
BlogService = __decorate([
    core_1.Injectable()
], BlogService);
exports.BlogService = BlogService;

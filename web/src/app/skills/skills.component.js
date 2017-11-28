"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SkillsComponent = (function () {
    function SkillsComponent() {
        this.skills = [
            [
                { 'name': 'Linux', 'progress': 45 },
                { 'name': 'Python', 'progress': 75 },
                { 'name': 'Go', 'progress': 50 },
                { 'name': 'Html / Html5 / Css3', 'progress': 65 },
                { 'name': 'javascript / typescript', 'progress': 75 },
            ], [
                { 'name': 'Django / tornado', 'progress': 80 },
                { 'name': 'JQuery', 'progress': 85 },
                { 'name': 'Angular / Angular2+', 'progress': 80 },
                { 'name': 'Bootstrap', 'progress': 90 },
            ], [
                { 'name': 'mysql / redis', 'progress': 75 },
                { 'name': 'Responsive Design', 'progress': 50 },
            ]
        ];
    }
    SkillsComponent.prototype.ngOnInit = function () {
    };
    return SkillsComponent;
}());
SkillsComponent = __decorate([
    core_1.Component({
        selector: 'app-skills',
        templateUrl: './skills.component.html',
        styleUrls: ['./skills.component.scss']
    })
], SkillsComponent);
exports.SkillsComponent = SkillsComponent;

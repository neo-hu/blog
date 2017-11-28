"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ocanvas_1 = require("ocanvas");
var TreeDirective = (function () {
    function TreeDirective(el) {
        this.el = el;
    }
    TreeDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.element = window.document.createElement('canvas');
        this.element.width = 500;
        this.height = this.element.height = this.el.nativeElement.offsetHeight;
        this.el.nativeElement.appendChild(this.element);
        var img = new Image();
        img.src = '/assets/menu.png';
        if (img.complete) {
            this.drawImage(img);
        }
        else {
            img.onload = function () {
                // this.element.width = img.width;
                // this.element.height = img.height;
                // this.ctx.scale(0.5, 0.5);
                // this.ctx.drawImage(img, 10, 10);
                _this.drawImage(img);
            };
        }
    };
    TreeDirective.prototype.animation = function (e, rotation) {
        var _this = this;
        var duration = Math.random() * 500 + 1500;
        this.ctx.animation.animate(e, [{
                rotation: rotation,
            }, {
                duration: duration,
                easing: 'linear',
                callback: function () {
                    _this.animation(e, -rotation);
                }
            }]);
    };
    TreeDirective.prototype.drawImage = function (img) {
        var scale = 1;
        if (this.height < img.height + 20) {
            // height = this.height;
            scale = this.height / (img.height + 20);
            // width = height / img.height * img.width;
        }
        this.element.width = img.width * scale;
        this.element.height = img.height * scale;
        this.ctx = ocanvas_1.default.create({
            canvas: this.element,
        });
        this.ctx.display.register('bg', {
            shapeType: 'rectangular'
        }, function (canvas) {
            canvas.drawImage(this.img, 10, 10, this.width, this.height);
        });
        this.text({
            x: 230 * scale,
            y: 220 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 60 * scale + "px LicensePlate",
            text: 'CONTACT',
            fill: '#145b9b'
        });
        this.text({
            x: 330 * scale,
            y: 270 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 80 * scale + "px LicensePlate",
            text: 'PROJECTS',
            fill: '#588ba4'
        });
        this.text({
            x: 200 * scale,
            y: 345 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 60 * scale + "px LicensePlate",
            text: 'OPENTSDB',
            fill: '#89b0c1'
        });
        this.text({
            x: 560 * scale,
            y: 333 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 85 * scale + "px LicensePlate",
            text: 'DJANGO',
            fill: '#00a4be'
        });
        this.text({
            x: 785 * scale,
            y: 410 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 85 * scale + "px LicensePlate",
            text: 'ABOUT',
            fill: '#145b9b'
        });
        this.text({
            x: 290 * scale,
            y: 142 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 70 * scale + "px LicensePlate",
            text: 'LVS',
            fill: '#90AA3B'
        });
        this.text({
            x: 400 * scale,
            y: 152 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 50 * scale + "px LicensePlate",
            text: 'DOCKER',
            fill: '#60bae3'
        });
        this.text({
            x: 300 * scale,
            y: 40 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 30 * scale + "px LicensePlate",
            text: 'Keepalived'.toUpperCase(),
            fill: '#145b9b'
        });
        this.text({
            x: 555 * scale,
            y: 80 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 65 * scale + "px LicensePlate",
            text: 'Blog'.toUpperCase(),
            fill: '#01aec9'
        });
        this.text({
            x: 560 * scale,
            y: 212 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 60 * scale + "px LicensePlate",
            text: 'hadoop'.toUpperCase(),
            fill: '#0275d8'
        });
        this.text({
            x: 682 * scale,
            y: 40 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 45 * scale + "px LicensePlate",
            text: 'golang'.toUpperCase(),
            fill: '#588ba4'
        });
        this.text({
            x: 680 * scale,
            y: 150 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 75 * scale + "px LicensePlate",
            text: 'works'.toUpperCase(),
            fill: '#588ba4'
        });
        this.text({
            x: 785 * scale,
            y: 280 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 65 * scale + "px LicensePlate",
            text: 'skills'.toUpperCase(),
            fill: '#60bae3'
        });
        this.text({
            x: 915 * scale,
            y: 340 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 55 * scale + "px LicensePlate",
            text: 'hbase'.toUpperCase(),
            fill: 'rgb(100, 91, 92)'
        });
        this.text({
            x: 928 * scale,
            y: 400 * scale,
            origin: { x: 'center', y: 'top' },
            font: "bold " + 45 * scale + "px LicensePlate",
            text: 'nginx'.toUpperCase(),
            fill: '#89b0c1',
        });
        this.ctx.addChild(this.ctx.display.bg({
            img: img,
            width: img.width * scale,
            height: img.height * scale
        }));
    };
    TreeDirective.prototype.text = function (conf) {
        var text = this.ctx.display.text(conf);
        this.animation(text, Math.random() * 2 >= 1 ? Math.random() * 5 + 5 : -Math.random() * 5 - 5);
        this.ctx.addChild(text);
    };
    TreeDirective.prototype.ngOnDestroy = function () {
    };
    return TreeDirective;
}());
TreeDirective = __decorate([
    core_1.Directive({
        selector: '[tree]'
    })
], TreeDirective);
exports.TreeDirective = TreeDirective;

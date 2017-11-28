import {Directive, Input, ElementRef, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import oCanvas from 'ocanvas';
import * as webfontloader from 'webfontloader';

@Directive({
  selector: '[tree]'
})
export class TreeDirective implements OnInit, OnDestroy {

  ctx;
  element;
  height;
  loading = '';
  scale: number;
  texts: {[key: string]: any};

  constructor(private el: ElementRef, private router: Router) {

  }

  ngOnInit(): void {

    webfontloader.load({
      custom: {
        families: ['LicensePlate'],
        urls: ['/assets/f.css']
      },
      loading: () => {
        // this.loading
        this.el.nativeElement.innerHTML = '字体加载中...';
      },
      active: () => {
         this.el.nativeElement.innerHTML = '';
        const img = new Image();
        img.src = '/assets/menu.png';
        if (img.complete) {
          this.element = window.document.createElement('canvas');
          this.element.width = 500;
          this.height = this.element.height = this.el.nativeElement.offsetHeight;
          this.el.nativeElement.appendChild(this.element);
          this.drawImage(img);
        } else {
          this.el.nativeElement.innerHTML = '背景加载中...';
          // el.hr
          img.onload = () => {
          this.el.nativeElement.innerHTML = '';
            this.element = window.document.createElement('canvas');
            this.element.width = 500;
            this.height = this.element.height = this.el.nativeElement.offsetHeight;
            this.el.nativeElement.appendChild(this.element);
            this.drawImage(img);
          };
        }
      },
    });
  }

  animation(e, rotation) {
    const duration = Math.random() * 500 + 1500;
    this.ctx.animation.animate(e, [{
      rotation: rotation,
      opacity: rotation < 0 ? 0.6 : 0.8,
    }, {
      duration: duration,
      easing: 'linear',
      callback: () => {
        this.animation(e, -rotation);
      }
    }]);
  }

  drawImage(img) {
    let scale = 1;
    if (this.height < img.height + 20) {
      // height = this.height;
      scale = this.height / (img.height + 20);
      // width = height / img.height * img.width;
    }
    this.scale = scale;
    this.element.width = img.width * scale;
    this.element.height = img.height * scale;
    this.ctx = oCanvas.create({
      canvas: this.element,
    });
    this.ctx.display.register('bg', {
      shapeType: 'rectangular'
    }, function (canvas) {
      canvas.globalAlpha = 0.8;
      canvas.drawImage(this.img, 10, 10, this.width, this.height);
      canvas.globalAlpha = 1;
    });

    this.texts = {
      'contact' : {
        x: 240,
        y: 210,
        fontSize: 60,
        text: 'contact',
        fill: '#145b9b',
        url: ['contact']
      },
        'projects' : {
        x: 330,
        y: 268,
        fontSize: 80,
        text: 'projects',
        fill: '#588ba4',
        url: ['works']
      }, 'opentsdb' : {
        x: 196,
        y: 342,
        fontSize: 60,
        text: 'opentsdb',
        fill: '#89b0c1'
      }, 'django' : {
        x: 556,
        y: 331,
        fontSize: 85,
        text: 'django',
        fill: '#00a4be'
      },
        'about' : {
        x: 780,
        y: 406,
        fontSize: 85,
        text: 'about',
        fill: '#145b9b',
        url: ['skills']
      }, 'lvs' : {
        x: 290,
        y: 142,
        fontSize: 68,
        text: 'lvs',
        fill: '#90AA3B'
      }, 'docker' : {
        x: 400,
        y: 152,
        fontSize: 48,
        text: 'docker',
        fill: '#60bae3'
      }, 'keepalived' : {
        x: 310,
        y: 38,
        fontSize: 30,
        text: 'keepalived',
        fill: '#145b9b'
      }, 'blog': {
        x: 552,
        y: 78,
        fontSize: 65,
        text: 'blog',
        fill: '#01aec9',
        url: ['blog']
      }, 'hadoop' : {
        x: 560,
        y: 212,
        fontSize: 60,
        text: 'hadoop',
        fill: '#0275d8'
      }, 'golang' : {
        x: 686,
        y: 38,
        fontSize: 45,
        text: 'golang',
        fill: '#588ba4'
      },
        'works' : {
        x: 680,
        y: 150,
        fontSize: 75,
        text: 'works',
        fill: '#588ba4',
        url: ['works']
      },
      'skills' : {
      x: 785,
      y: 280,
      fontSize: 65,
      text: 'skills',
      fill: '#60bae3',
        url: ['skills']
    }, 'tornado' : {
      x: 907,
      y: 350,
      fontSize: 35,
      text: 'tornado',
      fill: 'rgb(100, 91, 92)'
    }, 'nginx': {
      x: 928,
      y: 400,
      fontSize: 45,
      text: 'nginx',
      fill: '#89b0c1',
    }
    };
    this.ctx.addChild(this.ctx.display.bg({
      img: img,
      width: img.width * scale,
      height: img.height * scale
    }));
    Object.keys(this.texts).forEach(key => {
      const item = this.texts[key];
      this.text({
        opacity: 0.8,
        x: item.x * scale,
        y: item.y * scale,
        text: item.text.toUpperCase(),
        fill: item.fill,
        font: `bold ${item.fontSize * scale}px LicensePlate`,
        origin: {x: 'center', y: 'top'},
      });
    });


  }

  text(conf) {
    const text: any = this.ctx.display.text(conf);
    // this.animation(text, Math.random() * 2 >= 1 ? Math.random() * 5 + 5 : -Math.random() * 5 - 5 );
    this.animation(text, 3);
    this.ctx.addChild(text);
    text.bind('click', () => {
      const item = this.texts[text.text.toLowerCase()];
      if (item && item.url) {
        this.router.navigate(item.url);
      }
    });
    text.bind('mouseenter', () => {
      this.element.style.cursor = 'pointer';
      const item = this.texts[text.text.toLowerCase()];
      if (item) {
        text.font = `bold ${(item.fontSize * this.scale) * 1.1}px LicensePlate`;
      }
      text.fadeTo(1, 'short', 'ease-out-quad');
    });
    text.bind('mouseleave', () => {
      this.element.style.cursor = 'default';
      const item = this.texts[text.text.toLowerCase()];
      if (item) {
        console.log(item.fontSize * this.scale, item.fontSize, this.scale);
        text.font = `bold ${item.fontSize * this.scale}px LicensePlate`;
      }
      text.fadeTo(0.8, 'short', 'ease-out-quad');
    });
  }

  ngOnDestroy(): void {
  }

}

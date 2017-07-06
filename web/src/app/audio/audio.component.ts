import {Component, OnInit, ViewChild, Injectable} from '@angular/core';

import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {isUndefined} from "util";

export enum AudioEventType {
  PAUSE,
  PLAY
}

@Injectable()
export class AudioService {
  private eventSource: Subject<AudioEventType> = new Subject<AudioEventType>();
  public events: Observable<AudioEventType> = this.eventSource.asObservable();
  _stop = true;

  constructor() {
  }

  get stop() {
    return this._stop;
  }

  set stop(s: boolean) {
    this._stop = s;
    if (s) {
      this.eventSource.next(AudioEventType.PAUSE);
    } else {
      this.eventSource.next(AudioEventType.PLAY);
    }
  }
}


@Component({
  selector: '[audio]',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {
  @ViewChild('audio') audio;
  @ViewChild('canvas') canvas;
  loading = true;
  _an;
  stop = false;

  constructor(private audioService: AudioService) {
  }

  change(stop: boolean) {
    if (this.loading) {
      return;
    }
    if (isUndefined(stop)) {
      this.stop = !this.stop;
    } else {
      this.stop = stop;
    }
    if (!this.stop) {
      this.audio.nativeElement.play();

      this.loadCanvas();
    } else {
      if (this._an) {
        cancelAnimationFrame(this._an);
      }
      this.audio.nativeElement.pause();
    }
    // this.audioService.stop = this.stop;
  }

  load() {
    if (!this.audio.nativeElement.readyState) {
      setTimeout(() => {
        this.load();
      }, 200);
    } else {
      this.loading = false;
      this.audioService.stop = false;
    }
  }


  rand(max, min) {
    let b = (max === 0 || max) ? max : 1, a = min || 0;
    return a + (b - a) * Math.random();
  }

  x0;
  y0;
  x;
  y;
  w;
  h;
  ctx;
  t=0;
  t_step = 1 / 20;

  loadCanvas() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    let self = this;
    this.w = self.canvas.nativeElement.width = self.canvas.nativeElement.offsetWidth;
    this.h = self.canvas.nativeElement.height = self.canvas.nativeElement.offsetHeight;
    addEventListener("resize", () => {
      this.w = self.canvas.nativeElement.width = self.canvas.nativeElement.offsetWidth;
      this.h = self.canvas.nativeElement.height = self.canvas.nativeElement.offsetHeight;
    });

    this.animation();
  }

  animation() {
    this.x0 = -1;
    this.y0 = this.h / 2;
    this.ctx.clearRect(0, 0, this.w, this.h);
    let tmp = Math.pow(this.t, 1.75) / 19;
    for (this.x = 0; this.x < this.w; this.x = this.x + 3) {
      this.y = 9 * Math.sqrt(this.x) * Math.sin(this.x / 23 / Math.PI + this.t / 3 + Math.sin(this.x / 29 + this.t)) +
        32 * Math.sin(this.t) * Math.cos(this.x / 19 + this.t / 7) +
        16 * Math.cos(this.t) * Math.sin(Math.sqrt(this.x) + this.rand(3, 2) * tmp) + this.h / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x0, this.y0);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'hsl(' + (2 * this.x / this.w + this.t) * 180 + ', 100%, 65%)';
      this.ctx.stroke();
      this.x0 = this.x;
      this.y0 = this.y;
    }
    this.t += this.t_step;
    this._an = requestAnimationFrame(()=>this.animation());
  }


  ngOnInit() {
    this.load();
    this.audioService.events.subscribe(event => {
      if (event == AudioEventType.PLAY) {
        this.change(false);
      } else if (event == AudioEventType.PAUSE) {
        this.change(true);
      }
    })
  }

}

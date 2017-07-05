import {Injectable} from '@angular/core';

import {isPresent} from "./loading.utils";
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export enum LoadingBarEventType {
  PROGRESS,
  HEIGHT,
  COLOR,
  VISIBLE
}

export class LoadingBarEvent {
  constructor(public type: LoadingBarEventType, public value: any) {
  }
}

@Injectable()
export class LoadingBarService {

  private _progress: number = 0;
  private _height: string = '2px';
  private _color: string = 'firebrick';
  private _visible: boolean = true;

  private _incTimeout: any = 0;
  public interval: number = 500; // in milliseconds
  private icount = 0;
  private dcount = 0;

  private eventSource: Subject<LoadingBarEvent> = new Subject<LoadingBarEvent>();
  public events: Observable<LoadingBarEvent> = this.eventSource.asObservable();

  constructor() {
  }

  set progress(value: number) {
    if (isPresent(value)) {
      if (value > 0) {
        this.visible = true;
      }
      if(value>=100){
        value = 100;
      }
      this._progress = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.PROGRESS, this._progress));
    }
  }

  get progress(): number {
    return this._progress;
  }


  set height(value: string) {
    if (isPresent(value)) {
      this._height = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.HEIGHT, this._height));
    }
  }

  get height(): string {
    return this._height;
  }

  set color(value: string) {
    if (isPresent(value)) {
      this._color = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.COLOR, this._color));
    }
  }

  get color(): string {
    return this._color;
  }

  set visible(value: boolean) {
    if (isPresent(value)) {
      this._visible = value;
      this.emitEvent(new LoadingBarEvent(LoadingBarEventType.VISIBLE, this._visible));
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  private emitEvent(event: LoadingBarEvent) {
    if (this.eventSource) {
      // Push up a new event
      this.eventSource.next(event);
    }
  }

  increment() {
    this.icount++;
    if (this.icount > 0)
      this._set(this.dcount / this.icount);
  }

  decrement() {
    this.dcount++;
    if (this.dcount >= this.icount){
      this.dcount = this.icount;
      this.complete();
      return
    }
    if (this.icount > 0)
      this._set(this.dcount / this.icount);
  }

  _set(value: number) {
    this.progress = value * 100;

    if(this._incTimeout){
      clearTimeout(this._incTimeout);
      this._incTimeout = null;
    }
    this._incTimeout = setTimeout(() => {
      this._inc();
    }, this.interval);
  }

  _inc() {
    if (this.progress >= 100) {
      return;
    }

    let rnd = 0;

    let stat = this.progress/100;
    if (stat >= 0 && stat < 0.25) {
      // Start out between 3 - 6% increments
      rnd = (Math.random() * (5 - 3 + 1) + 3) / 100;
    } else if (stat >= 0.25 && stat < 0.65) {
      // increment between 0 - 3%
      rnd = (Math.random() * 3) / 100;
    } else if (stat >= 0.65 && stat < 0.90) {
      // increment between 0 - 2%
      rnd = (Math.random() * 2) / 100;
    } else if (stat >= 0.90 && stat < 0.99) {
      // finally, increment it .5 %
      rnd = 0.005;
    } else {
      // after 99%, don't increment:
      rnd = 0;
    }
    this._set(stat+rnd);
  }

  // start(onCompleted: Function = null) {
  //   // Stop current timer
  //   this.stop();
  //   // Make it visible for sure
  //   this.visible = true;
  //   // Run the timer with milliseconds iterval

  // }
  //
  // stop() {

  // }

  // reset() {
  //   this.stop();
  //   this.progress = 0;
  // }

  complete() {
    this.progress = 100;

    this.icount = this.dcount = 0;
    // this.stop();
    setTimeout(() => {
      // Hide it away
      this.visible = false;
      setTimeout(() => {
        // Drop to 0
        // this.progress = 0;
      }, 250);
    }, 250);
  }


}

import { Component, OnInit, Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import { CookieService, CookieOptionsArgs } from '../cookie.service';



@Injectable()
export class ThemesService {
  private themeSource:  Subject<string> = new Subject<string>();
  public events:  Observable<string> = this.themeSource.asObservable();
  private _theme: string;

  get theme(){
    return this._theme;
  }

  set theme(value: string){
    this._theme = value;
    this.themeSource.next(value);
  }
}

@Component({
  selector:  '[themes]',
  templateUrl:  './themes.component.html',
  styleUrls:  ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  themes = {'default': '#645b5c', 'r1':  '#2b9eb1', 't2':  '#ca0d86', 't3':  '#e1483f', 't4':  '#7de87d'};
  cookieKey = 'neo_theme';
  constructor(private cookieService: CookieService,
              private themesService: ThemesService) {

  }

  selectTheme(key: string) {
    if (key === 'default') {
      document.body.removeAttribute('theme');
      this.cookieService.remove(this.cookieKey);
    } else {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 10);
      const opts:  CookieOptionsArgs = {
        expires:  date
      };
      this.cookieService.put(this.cookieKey, key, opts);
      document.body.setAttribute('theme', key);
    }
    this.themesService.theme = this.themes[key];
  }
  ngOnInit() {
    const cookieTheme = this.cookieService.get(this.cookieKey);
    if (cookieTheme) {
      this.selectTheme(cookieTheme);
    } else {
      this.selectTheme('default');
    }
  }

}

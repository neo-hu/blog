import { Component, OnInit, Injectable } from '@angular/core';
import 'rxjs/add/operator/filter';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class ThemesService {
  private themeSource: Subject<string> = new Subject<string>();
  public events: Observable<string> = this.themeSource.asObservable();
  private _theme:string;

  get theme(){
    return this._theme;
  }

  set theme(value:string){
    this._theme = value;
    this.themeSource.next(value);
  }
}

@Component({
  selector: '[themes]',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  themes = {"default":"#2b9eb1", "r1": "#645b5c", "t2": "#ca0d86", "t3": "#e1483f", "t4": "#7de87d"};
  constructor(private themesService:ThemesService) {

  }

  selectTheme(key:string) {
    if (key == "default"){
      document.body.removeAttribute("theme");
    }else{
      document.body.setAttribute("theme", key);
    }
    this.themesService.theme = this.themes[key];
  }
  ngOnInit() {
    this.selectTheme("default");
  }

}

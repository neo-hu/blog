import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationCancel, NavigationError, NavigationEnd } from '@angular/router';
import {LoadingBarService} from './loading/loading.service';
import {ToastyService, ToastyConfig} from './modules/toasty';
import { ThemesService } from './themes/themes.component';

@Component({
  selector: '[neo-app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit{
  showMenu = false;
  color;
  ngOnInit(): void {
    this.color = this.themesService.theme;
    this.themesService.events.subscribe(theme=>this.color=theme);

    this.router.events
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.showMenu = false;
          this.loader.increment();
        } else if (event instanceof NavigationCancel) {
          this.loader.decrement();
        } else if (event instanceof NavigationError) {
          this.loader.decrement();
          this.toastyService.error({
            title: "JS Error",
            msg: event.error.message,
            showClose: true
          });
        } else if (event instanceof NavigationEnd) {
          this.loader.decrement();
        }
      }, (error: any) => {
        console.log(error);
        this.loader.decrement();
      });
  }

  constructor(private router: Router, private route: ActivatedRoute,
              private toastyService: ToastyService,
              private themesService:ThemesService,
              private loader: LoadingBarService,){

  }
}

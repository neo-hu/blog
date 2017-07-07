import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {JsonpModule, HttpModule, Jsonp} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Title} from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {RoutingModule} from './routing/routing.module';
import {CircleProgressComponent} from './circle-progress/circle-progress.component';
import {Http, RequestOptions, XHRBackend} from '@angular/http';
import {LoadingComponent} from './loading/loading.component';
import {LoadingBarService} from './loading/loading.service';
import {ToastyModule, ToastyService, ToastyConfig} from './modules/toasty';


import {HttpServiceFactory} from "./http-service"
// TODO PIPE
import {KeysPipe} from './util.pipe';

import {ThemesService} from './themes/themes.component';
import {BlogService} from './blog/blog.service';
// TODO component
import {AppComponent} from './app.component';
import {ThemesComponent} from './themes/themes.component';
import {AboutMeComponent} from './about-me/about-me.component';
import {SkillsComponent} from './skills/skills.component';
import {WorksComponent} from './works/works.component';
import {BlogComponent} from './blog/blog.component';
import {BlogCategoryComponent} from './blog-category/blog-category.component';
import {BlogArticleComponent, ArticleModalContent} from './blog-article/blog-article.component'
import {ContactComponent} from './contact/contact.component';
import { AudioComponent, AudioService } from './audio/audio.component';
import { CookieService } from './cookie.service';



@NgModule({
  declarations: [
  AppComponent,
  ThemesComponent,
  AboutMeComponent,
  WorksComponent,
  SkillsComponent,
  BlogComponent,
  BlogCategoryComponent,
  BlogArticleComponent,
  ArticleModalContent,
  ContactComponent,
  CircleProgressComponent,
  LoadingComponent,
  AudioComponent,
    KeysPipe,
],
  entryComponents:[ArticleModalContent],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpModule,
    JsonpModule,
    RoutingModule,
    ToastyModule.forRoot()
  ],
  providers: [ThemesService, Title, CookieService, LoadingBarService, BlogService, Jsonp, AudioService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: Http,
      useFactory: HttpServiceFactory,
      deps: [XHRBackend, RequestOptions, LoadingBarService, ToastyService, ToastyConfig]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {RoutingModule} from './routing/routing.module';
import {CircleProgressComponent} from './circle-progress/circle-progress.component';
// TODO PIPE
import utilPipe from './util.pipe';

import { ThemesService } from './themes/themes.component';
// TODO component
import { AppComponent } from './app.component';
import { ThemesComponent } from './themes/themes.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { WorksComponent } from './works/works.component';
import { BlogComponent } from './blog/blog.component';
import { ContactComponent } from './contact/contact.component';

const DECLARATIONS:any[] = [
    AppComponent,
    ThemesComponent,
    AboutMeComponent,
    WorksComponent,
    SkillsComponent,
    BlogComponent,
    ContactComponent,
    CircleProgressComponent,
];

@NgModule({
  declarations: DECLARATIONS.concat(utilPipe),
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule.forRoot(),
    HttpModule,
    RoutingModule
  ],
  providers: [ThemesService],
  bootstrap: [AppComponent]
})
export class AppModule { }

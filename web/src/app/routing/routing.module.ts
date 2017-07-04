import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsComponent } from '../skills/skills.component'
import { AboutMeComponent } from '../about-me/about-me.component'
import { WorksComponent } from '../works/works.component'
import { BlogComponent } from '../blog/blog.component'
import { ContactComponent } from '../contact/contact.component'

const routes: Routes = [
  // { path: '', redirectTo: '/skills/', pathMatch: 'full' },
  { path: '',  component: AboutMeComponent},
  { path: 'skills',  component: SkillsComponent},
  { path: 'works',  component: WorksComponent},
  { path: 'blog',  component: BlogComponent},
  { path: 'contact',  component: ContactComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsComponent } from '../skills/skills.component'
import { AboutMeComponent } from '../about-me/about-me.component'
import { WorksComponent } from '../works/works.component'
import { BlogComponent } from '../blog/blog.component'
import { BlogCategoryComponent } from '../blog-category/blog-category.component'
import { BlogArticleComponent } from '../blog-article/blog-article.component'
import { ContactComponent } from '../contact/contact.component'

const routes: Routes = [
  // { path: '', redirectTo: '/skills/', pathMatch: 'full' },
  { path: '',  component: AboutMeComponent},
  { path: 'skills',  component: SkillsComponent},
  { path: 'works',  component: WorksComponent},
  { path: 'blog',  component: BlogComponent,
     children: [
      {
        path: ':category',
        outlet:"category",
        component: BlogCategoryComponent
      },
      {
        path: '',
        outlet:"category",
        component: BlogCategoryComponent
      },
      {
        path: ':article',
        outlet:"article",
        component: BlogArticleComponent
      },]
  },
  { path: 'contact',  component: ContactComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }

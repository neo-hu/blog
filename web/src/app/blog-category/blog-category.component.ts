import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog/blog.service';
import { Article, Category } from '../blog/blog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.scss']
})
export class BlogCategoryComponent implements OnInit {
  articles;
  constructor(private blogService:BlogService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(_=>{
      this.articles =null;
      this.blogService.getArticles().map(r=>{
        this.articles = [];
        return r;
      }).switchMap(r=>{
        return r.sort((a, b)=>{
          return b["postdate"] < a["postdate"]? -1 : 1;
        }).sort((a, b)=>{
          return b["top"] < a["top"]? -1 : 1;
        });
      }).filter(item=>{
        if ("category" in _){
          return item.categories && item.categories.indexOf(_["category"]) > -1;
        }
        return true;
      }).subscribe(r=>this.articles.push(r));
    });
  }

}

import { Injectable } from '@angular/core';
import { Jsonp, Http, URLSearchParams }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Subject }     from 'rxjs/Subject';
import { Article, Category } from './blog';
import 'rxjs/add/operator/map';
import {isUndefined} from "util";

@Injectable()
export class BlogService {
  articlesObservable;
  constructor(private http: Http) { }

  getArticle(_id:string):Observable<string>{
    return this.http.get("https://neo-hu.github.io/blog/db/"+_id).map(response => {
      return response.text();
    });
  }
  getArticles():Observable<Article[]>{
    if (isUndefined(this.articlesObservable)){
      this.articlesObservable = this.http.get("https://neo-hu.github.io/blog/db/articles.json")
        .map(response => response.json());
    }
    return this.articlesObservable;
  }
  getCategories():Observable<Category[]>{
    return this.http.get("https://neo-hu.github.io/blog/db/categories.json")
       .map(response => response.json());
  }
}

import { Injectable } from '@angular/core';
import { Jsonp, Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Article, Category } from './blog';
import 'rxjs/add/operator/map';
import {isUndefined} from 'util';

@Injectable()
export class BlogService {
  articlesObservable;
  constructor(private http: Http) { }

  getArticle(_id: string): Observable<string> {
    return this.http.get('/db/' + _id).map(response => {
      return response.text();
    });
  }
  getArticles(): Observable<Article[]> {
    if (isUndefined(this.articlesObservable)) {
      this.articlesObservable = this.http.get('/db/articles.json')
        .map(response => response.json());
    }
    return this.articlesObservable;
  }
  getCategories(): Observable<Category[]> {
    return this.http.get('/db/categories.json')
       .map(response => response.json());
  }
}

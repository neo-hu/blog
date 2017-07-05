import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { BlogService } from '../blog/blog.service';
import { Article, Category } from '../blog/blog';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';

@Component({
  selector: '[article-modal-content]',
  template: `
    <div class="modal-body">
        <div class="article" >
            <div *ngIf="!article">
              <div class="loading1"></div>
              <div class="loading1-text">Loading...</div>
            </div>
          <div *ngIf="article" [innerHTML]="article"></div>
        </div>
    </div>
   
  `
})
export class ArticleModalContent implements OnInit {
  @Input() article_uri;
  article;
  ngOnInit(): void {
      this.article = null;
      this.blogService.getArticle(this.article_uri).subscribe(r=>this.article=r);
  }

  constructor(private blogService:BlogService, public activeModal: NgbActiveModal) {}
}

@Component({
  selector: '[app-blog-article]',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogArticleComponent implements OnInit {
  constructor(private _location: Location, private blogService:BlogService, private router: Router, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit() {
    this.route.params.subscribe(_=>{
      window.setTimeout(()=>{
        let modalRef = this.modalService.open(ArticleModalContent, {windowClass: 'article-modal'});
        modalRef.componentInstance.article_uri = _.article;
        modalRef.result.then((result) =>{
        }, (reason) => {
          this._location.back();
        })
      })
    })
  }

}

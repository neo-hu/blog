/**
 * Created by hulingjie on 2017/7/4.
 */

export class Category{
  d?:string;
  title:string;
  url:string;
}

export class Article{
  description_text:string;
  postdate?:string;
  title:string;
  top:number;
  url:string;
  categories=[];
}

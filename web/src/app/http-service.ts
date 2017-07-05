import {Injectable} from '@angular/core';
import {
  Http,
  Request,
  RequestOptions,
  Response,
  XHRBackend,
  ReadyState,
  XHRConnection,
  BrowserXhr,
  ResponseOptions
} from '@angular/http';
import {LoadingBarService} from './loading/loading.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import {ToastyService, ToastyConfig} from './modules/toasty';

@Injectable()
export class HttpService extends Http {
  constructor(backend: XHRBackend, options: RequestOptions, private loader: LoadingBarService,
              private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    super(backend, options);
    this.toastyConfig.theme = 'bootstrap';
    // this.toastyConfig.theme = 'bootstrap';
  }

  request(url: string | Request, options?: any): Observable<Response> {
    this.loader.increment();
    return this.intercept(super.request(url, options));
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable
      .do((res: Response) => {
      }, (err: any) => {
        this.toastyService.error({
          title: err.statusText,
          msg: err._body,
          showClose: true
        });
      })
      .finally(() => {
        this.loader.decrement();
      });
  }
}

export function HttpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, loader: LoadingBarService, toastyService: ToastyService, toastyConfig: ToastyConfig) {
  return new HttpService(backend, defaultOptions, loader, toastyService, toastyConfig);
}


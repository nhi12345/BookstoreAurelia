import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { inject } from "aurelia-framework";
import {HttpTokenInterceptor} from 'interceptors/http-token.interceptor';
@inject(HttpTokenInterceptor)
export class App {
  constructor(
    private interceptor: HttpTokenInterceptor,
    private router: Router,
  ) {
    this.interceptor.configInterceptor();
  }

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Bookstore';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: '', moduleId: PLATFORM.moduleName('./modules/login/login'), title: 'Login'},
      {route: 'books', name: 'books', moduleId: PLATFORM.moduleName('./modules/books/books'), title: 'Books'},
      {route: 'books/:id', name: 'book-detail', moduleId: PLATFORM.moduleName('./modules/book-detail/book-detail'), title: 'Book'},
      {route: 'books/new', name: 'book-new', moduleId: PLATFORM.moduleName('./modules/new-book/new-book'), title: 'New Book'},
    ]);

    this.router
  }
}

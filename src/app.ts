import { HttpTokenInterceptor } from './interceptors/http-token.interceptor';
import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { inject } from "aurelia-framework";
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
    ]);

    this.router
  }
}

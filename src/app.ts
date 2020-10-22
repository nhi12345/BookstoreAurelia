import {Router, RouterConfiguration} from 'aurelia-router';
import {PLATFORM} from 'aurelia-pal';
import { AuthService } from "services/authService";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
@inject(AuthService, HttpClient)
export class App {
  router: Router;
  authService: AuthService;

  constructor(authService, http) {
    this.authService = authService;

    const baseUrl = "https://nga-book-api.herokuapp.com/api/";

    http.configure(config => {
      config
        .withBaseUrl(baseUrl)
        .withInterceptor(this.authService.tokenInterceptor);
    });
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

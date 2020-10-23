import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class HttpTokenInterceptor {

  constructor(private http: HttpClient) {}

  public tokenInterceptor(): any {
    return {
      request(request: any) {
        let token = window.localStorage.getItem("token");
        if (token && request.url.split('/').pop() !== 'login') {
          request.headers
            .append('authorization', `Bearer ${token}`);
        }
        return request;
      }
    };
  }

  public configInterceptor() {
    const baseUrl = "https://nga-book-api.herokuapp.com/api/";
    this.http.configure(config => {
      config
        .withBaseUrl(baseUrl)
        .withInterceptor(this.tokenInterceptor());
    });
  }

}
import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {Constant} from 'constants/constatnt';

@inject(HttpClient, Constant)
export class HttpTokenInterceptor {

  constructor(
    private http: HttpClient,
    private constant: Constant
  ) {}

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
    this.http.configure(config => {
      config
        .withBaseUrl(this.constant.baseUrl)
        .withInterceptor(this.tokenInterceptor());
    });
  }

}
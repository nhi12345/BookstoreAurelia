import {inject} from 'aurelia-framework';
import {LoginRequest} from 'models/login/loginRequest';
import {RequestService} from './requestService';
@inject(RequestService)
export class AuthService {

  constructor(private requestService: RequestService) {
  }

  login(username: string, password: string): any {
    let loginParams = new LoginRequest(username, password);
    return this.requestService.post(loginParams, 'https://nga-book-api.herokuapp.com/api/auths/login')
      .then((data: any) => {
        if (data.token) {
          window.localStorage.setItem("token", data.token);
        }
        return data;
      });
  }

  logOut() {
    window.localStorage.removeItem("token");
  }

}
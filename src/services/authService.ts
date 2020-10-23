import {inject} from 'aurelia-framework';
import {LoginRequest} from 'models/login/loginRequest';
import {RequestService} from './requestService';
import {Constant} from 'constants/constatnt';
@inject(RequestService, Constant)
export class AuthService {

  constructor(
    private requestService: RequestService,
    private constant: Constant
  ) {
  }

  login(username: string, password: string): any {
    let loginParams = new LoginRequest(username, password);
    return this.requestService.post(loginParams, this.constant.authUrl)
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
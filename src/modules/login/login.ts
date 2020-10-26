import {inject, NewInstance} from 'aurelia-framework';
import {AuthService} from '../../services/authService';
import {Router} from 'aurelia-router';
import {ValidationRules, ValidationController} from 'aurelia-validation';

@inject(AuthService, Router, NewInstance.of(ValidationController))
export class Login {

  public username: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private controller: ValidationController
  ) {
    ValidationRules
      .ensure((form: Login) => form.username).required().withMessage('Please enter your email')
      .ensure((form: Login) => form.password).required().withMessage('Please enter your password')
      .on(this);
  }

  login() {
    this.controller.validate().then(res => {
      if (res.valid) {
        this.authService.login(this.username, this.password)
          .then((data: {token: string; message: string;}) => {
            if (data.token) {
              alert('Login success');
              this.router.navigateToRoute('');
            } else {
              alert(data.message);
            }
          });
      }
    });
  }

}
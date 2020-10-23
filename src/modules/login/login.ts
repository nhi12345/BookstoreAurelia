import {inject} from 'aurelia-framework';
import {AuthService} from '../../services/authService';
import {Router} from 'aurelia-router';

@inject(AuthService, Router)
export class Login {

	public username: string;
  public password: string;

	constructor(
		private authService: AuthService,
		private router: Router,
	) {
	}

	login() {
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

}

import { inject } from 'aurelia-framework';
import {EventAggregator} from "aurelia-event-aggregator";
// import {WebAPI} from "./web-api";
@inject(EventAggregator)
export class Login {

  username;
  password;
  remember;
  hasFocus;

	constructor(api, ea) {
		// this.api = api;
		// this.ea = ea;

		this.username = "";
		this.password = "";
		this.remember = false;
	}

	attached() {
		this.hasFocus = true;
	}

	login() {
    alert('login success');
	}

	get canSave() {
    console.log(this.username);
    return true;
		// return this.email && this.password && !this.api.isRequesting;
	}
}

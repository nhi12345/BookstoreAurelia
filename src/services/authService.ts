import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
@inject(HttpClient)
export class AuthService {

    constructor(private http: HttpClient) {
        // http = new HttpClient();
    }

    login(userName, password): any {

        return this.http.fetch('https://nga-book-api.herokuapp.com/api/auths/login', {
            method: 'post',
            body: json({username: userName, password: password})
        })
            .then(response => response.json())
            .then(data => {
                if (data.token)
                    window.localStorage.setItem("token", data.token);
                return data;
            })
            .catch(error => {
                console.log('Error retrieving token');
            });
    }

    logOut() {
        window.localStorage.removeItem("token");
    }

    getToken() {
        return window.localStorage.getItem("token");
    }

    get tokenInterceptor() {
        let auth = this;
        return {
            request(request) {
                let token = auth.getToken();
                if (token) {
                    request.headers
                        .append('authorization', `bearer ${token}`);
                }
                return request;
            }
        };
    }

}
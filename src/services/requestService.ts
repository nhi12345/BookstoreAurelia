import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class RequestService {
  
  constructor(private http: HttpClient){}

    public post(params: any, url: string): any {
      return this.http.fetch(url, {
        method: 'post',
        body: json(params)
    })
        .then(response => response.json())
    }

    public get(url: string): any {
      return this.http.fetch(url)
        .then(response => response.json());      
    }
    
}
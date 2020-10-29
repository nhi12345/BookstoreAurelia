import {inject} from 'aurelia-framework';
import {RequestService} from './requestService';
import {Author} from 'models/book/book';
import {Constant} from 'constants/constatnt';
@inject(RequestService, Constant)
export class AuthorService {
  
  constructor(
    private requestService: RequestService,
    private constant: Constant
    ) {}

  public getAuthors(): Promise<Author[]> {
    return this.requestService.get(this.constant.authorUrl);
  }
}
import {inject} from 'aurelia-framework'
import {Constant} from 'constants/constatnt';
import {RequestService} from './requestService';
@inject(RequestService, Constant)
export class BookService {
  constructor(
    private requestService: RequestService,
    private constant: Constant
  ) {
  }

  getBooks(): any {
    return this.requestService.get(this.constant.bookUrl);
  }
}
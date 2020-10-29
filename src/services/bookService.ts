import {inject} from 'aurelia-framework'
import {Constant} from 'constants/constatnt';
import {RequestService} from './requestService';
import {Book} from 'models/book/book';
@inject(RequestService, Constant)
export class BookService {
  constructor(
    private requestService: RequestService,
    private constant: Constant
  ) {
  }

  getBooks(): Promise<Book[]> {
    return this.requestService.get(this.constant.bookUrl);
  }

  getBook(id: number): Promise<Book> {
    let url = `${this.constant.bookUrl}${id}`;
    return this.requestService.get(url);
  }

  createBook(book: Book): Promise<Book> {
    return this.requestService.post(book, this.constant.bookUrl);
  }
}
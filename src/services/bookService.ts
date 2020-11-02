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

  getAllBooks(bookName: string, authorId: number): Promise<Book[]> {
    let url = `${this.constant.bookUrl}?bookName=${bookName}`;
    if (authorId === 0) {
      url = `${this.constant.bookUrl}?authorId=&bookName=${bookName}`;
    }
    return this.requestService.get(url);
  }

  getBooksPaginationAndFilter(authorId: number, bookName: string, pageNumber: number, pageSize: number): Promise<Book[]> {
    let url = `${this.constant.bookUrl}?authorId=${authorId}&bookName=${bookName}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
    if (authorId === 0) {
      url = `${this.constant.bookUrl}?authorId=&bookName=${bookName}&pageSize=${pageSize}&pageNumber=${pageNumber}`;
    }
    return this.requestService.get(url);
  }

  getBook(id: number): Promise<Book> {
    let url = `${this.constant.bookUrl}${id}`;
    return this.requestService.get(url);
  }

  createBook(book: Book): Promise<Book> {
    return this.requestService.post(book, this.constant.bookUrl);
  }

  deleteBook(id: number): void {
    let url = `${this.constant.bookUrl}${id}`;
    this.requestService.delete(url);
  }

  updateBook(id: number, book: Book): Promise<Book> {
    let url = `${this.constant.bookUrl}${id}`;
    return this.requestService.update(book, url);
  }
  
}
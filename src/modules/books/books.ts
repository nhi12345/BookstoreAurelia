import {inject} from 'aurelia-framework'
import {BookService} from 'services/bookService';
import {BookResponse} from 'models/book/BookResponse';
@inject(BookService)
export class Books {

  public books: BookResponse[];

  constructor(private bookService: BookService) {
  }

  public created() {
    this.bookService.getBooks().then((books: BookResponse[]) => {
      this.books = books;
    });
  }
}

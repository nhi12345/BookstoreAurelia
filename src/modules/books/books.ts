import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {BookService} from 'services/bookService';
import {BookResponse} from 'models/book/BookResponse';
@inject(BookService, Router)
export class Books {

  public books: BookResponse[];
  public selectedId: number;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {
  }

  public created() {
    this.bookService.getBooks().then((books: BookResponse[]) => {
      this.books = books;
    });
  }

  public select(book: BookResponse) {
    this.selectedId = book.id;
    return true;
  }

  public createBook() {
    this.router.navigate('#/books/new')
  }
}

import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {BookService} from 'services/bookService';
import {Book} from 'models/book/book';
@inject(BookService, Router)
export class Books {

  public books: Book[];
  public selectedId: number;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {
  }

  public created() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigateToRoute('login');
    }
    this.bookService.getBooks().then((books: Book[]) => {
      this.books = books;
    });
  }

  public select(book: Book) {
    this.selectedId = book.id;
    return true;
  }

  public createBook() {
    this.router.navigate('#/books/new')
  }
}

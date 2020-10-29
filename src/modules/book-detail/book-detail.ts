import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework';
import {Book} from "models/book/book";
import {BookService} from 'services/bookService';
import './book-detail.css';

@inject(BookService, Router)
export class BookDetail {

  public book: Book;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {
  }

  public activate(params) {
    return this.bookService.getBook(params.id).then((book => {
      this.book = <Book>book;
    }));
  }

  deleteBook() {
    let currentBookId = this.router.currentInstruction.params.id;
    this.bookService.deleteBook(currentBookId);
  }
}

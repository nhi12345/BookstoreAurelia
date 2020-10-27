import { inject } from 'aurelia-framework';
import {Book} from "models/book/book";
import {BookService} from 'services/bookService';
import './book-detail.css';

@inject(BookService)
export class BookDetail {

  public book: Book;
  public router;
  public originalBook: Book;

  constructor(private bookService: BookService) {
  }

  public activate(params, router) {
    this.router = router;
    return this.bookService.getBook(params.id).then((book => {
        this.book = <Book>book;
        this.router.navModel.setTitle(this.book.name);
        this.originalBook = JSON.parse(JSON.stringify(this.book));
    }));
}
}

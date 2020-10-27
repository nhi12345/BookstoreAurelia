import { inject } from 'aurelia-framework';
import {BookResponse} from "models/book/bookResponse";
import {BookService} from 'services/bookService';
import './book-detail.css';

@inject(BookService)
export class BookDetail {

  public book: BookResponse;
  public router;
  public originalBook: BookResponse;

  constructor(private bookService: BookService) {
  }

  public activate(params, router) {
    this.router = router;
    return this.bookService.getBook(params.id).then((book => {
        this.book = <BookResponse>book;
        this.router.navModel.setTitle(this.book.name);
        this.originalBook = JSON.parse(JSON.stringify(this.book));
    }))
}
}

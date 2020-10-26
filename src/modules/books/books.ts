import {inject} from 'aurelia-framework'
import {BookService} from 'services/bookService';
@inject(BookService)
export class Books {

  public books: any[];

  constructor(private bookService: BookService) {
  }

  created() {
    this.bookService.getBooks().then(books => {
      this.books = books;
      console.log(books);
    });
  }
}

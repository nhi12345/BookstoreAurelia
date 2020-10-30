import {Router} from 'aurelia-router';
import {inject, bindable} from 'aurelia-framework';
import {Book} from "models/book/book";
import {BookService} from 'services/bookService';
import './book-detail.css';
import {DialogService} from 'aurelia-dialog';
import {ConfirmModal} from 'modules/confirm-modal/confirm-modal';
import {UpdateBook} from 'modules/update-book/update-book';

@inject(BookService, Router, DialogService)
export class BookDetail {

  public book: Book;

  @bindable
  action = () => {};

  constructor(
    private bookService: BookService,
    private router: Router,
    private dialog: DialogService
  ) {
  }

  public activate(params) {
    return this.bookService.getBook(params.id).then((book => {
      this.book = <Book>book;
    }));
  }

  deleteBook() {
    let currentBookId = this.router.currentInstruction.params.id;
    this.dialog.open({viewModel: ConfirmModal, model: 'You want to delete this book?'}).whenClosed().then(response => {
      if (response.wasCancelled) {
        return;
      } else {
        this.bookService.deleteBook(currentBookId);
        alert('This book was successfully deleted.')
        this.router.navigateToRoute('books');
      }
    });
  }

  updateBook() {
    this.dialog.open({viewModel: UpdateBook, model: 'You want to delete this book?'}).whenClosed().then(response => {
      if (response.wasCancelled) {
        return;
      } else {
        let currentBookId = this.router.currentInstruction.params.id;
        this.bookService.getBook(currentBookId).then((book => {
          this.book = <Book>book;
        }));
      }
    });
  }
}

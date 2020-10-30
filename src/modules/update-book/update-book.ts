import {Router} from 'aurelia-router';
import {inject, NewInstance} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import './update-book.css'
import {Book} from 'models/book/book';
import {BookService} from 'services/bookService';
import {ValidationController, ValidationRules} from 'aurelia-validation';
@inject(DialogController, Router, BookService, NewInstance.of(ValidationController))
export class UpdateBook {
  public message: string;
  public book: Book;
  public name: string ;
  public price: number;
  public year: number;
  public currentBookId = this.router.currentInstruction.params.id;
  constructor(
    private dialog: DialogController,
    private router: Router,
    private bookService: BookService,
    private controller: ValidationController
  ) {
    ValidationRules
      .ensure((form: UpdateBook) => form.name).required().withMessage('Please enter book name')
      .ensure((form: UpdateBook) => form.price).required().withMessage('Please enter book price')
      .ensure((form: UpdateBook) => form.year).required().withMessage('Please enter the year of book production')
      .on(this);
  }

  activate(message: string) {
    this.message = message;
  }

  created() {
    this.bookService.getBook(this.currentBookId).then((book => {
      this.book = <Book>book;
      this.name = this.book.name;
      this.price = this.book.price;
      this.year = this.year;
    }));
  }

  ok() {
    this.controller.validate().then(res => {
      if (res.valid) {
        this.book.name = this.name;
        this.book.price = parseFloat(this.price+'');
        this.book.year = parseFloat(this.year+'');
        this.book.cover = null;
        this.bookService.updateBook(this.currentBookId, this.book).then((book) => {
          this.book = book;
        });
        this.dialog.ok();
      }
    });
  }

  cancel() {
    this.dialog.cancel();
  }

}

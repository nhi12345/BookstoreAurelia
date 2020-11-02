import {Router} from 'aurelia-router';
import {inject, NewInstance} from 'aurelia-framework';
import './new-book.css'
import {AuthorService} from 'services/authorService';
import {Author, Book} from 'models/book/book';
import {BookService} from 'services/bookService';
import {ValidationController, ValidationRules} from 'aurelia-validation';
@inject(AuthorService, BookService, Router, NewInstance.of(ValidationController))
export class NewBook {

  public authors: Author[] = [];
  public name: string = '';
  public price: number = null;
  public description: string = '';
  public publisher: string = '';
  public year: number = null;
  public cover: File = null;
  public authorSelected: Author;
  public book: Book;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router,
    private controller: ValidationController
  ) {
    ValidationRules
      .ensure((form: NewBook) => form.name).required().withMessage('Please enter book name')
      .ensure((form: NewBook) => form.price).required().withMessage('Please enter book price')
      .ensure((form: NewBook) => form.year).required().withMessage('Please enter the year of book production')
      .on(this);
  }

  created() {
    this.authorService.getAuthors().then((authors) => {
      this.authors = authors;
    });
  }

  public submit() {
    this.controller.validate().then(res => {
      if (res.valid) {
        const reader = new FileReader();
        reader.readAsDataURL(this.cover[0]);
        reader.onload = () => {
          let coverString = reader.result.toString().split(`,`)[1];
          let newBook = new Book(this.name, this.description, parseFloat(this.price + ''), parseInt(this.year + ''), this.publisher, coverString, this.authorSelected);
          this.bookService.createBook(newBook).then((book) => {
            this.book = book;
            alert('Success');
            this.router.navigateToRoute('books');
          });
        };
      }
    });
  }

}

import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework';
import './new-book.css'
import {AuthorService} from 'services/authorService';
import {Author, Book} from 'models/book/book';
import {BookService} from 'services/bookService';
@inject(AuthorService, BookService, Router)
export class NewBook {

  public authors: Author[] = [];
  public name: string = '';
  public price: number = null;
  public description: string = '';
  public publisher: string = '';
  public year:number = null;
  public cover: File = null;
  public  authorSelected: Author;

  constructor(
    private authorService: AuthorService,
    private bookService: BookService,
    private router: Router,
  ) {
  }

  created() {
    this.authorService.getAuthors().then((authors) => {
      this.authors = authors;
      console.log(authors);
    });
  }

  public submit() {
    const reader = new FileReader();
    reader.readAsDataURL(this.cover[0]);
    reader.onload = () => {
      let coverString = reader.result.toString().split(`,`)[1];
      let newBook = new Book(this.name, this.description, parseFloat(this.price+''), parseInt(this.year+''), this.publisher, coverString, this.authorSelected);
      this.bookService.createBook(newBook).then(() => {
        alert('Success');
        this.router.navigateToRoute('books');
      });
    };
    // console.log(coverString);
  }

}

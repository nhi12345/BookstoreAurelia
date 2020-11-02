import { AuthorService } from 'services/authorService';
import { Router } from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {BookService} from 'services/bookService';
import {Book, Author} from 'models/book/book';
@inject(BookService, AuthorService, Router)
export class Books {

  public books: Book[];
  public selectedId: number;
  public pageNumber: number = 1;
  public pageSize: number = 8;
  public bookTotal: number;
  public bookName: string = '';
  public authors: Author[];
  public authorSelected: Author = null;
  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
  ) {
  }

  public created() {
    if (!window.localStorage.getItem('token')) {
      this.router.navigateToRoute('login');
    }
    this.authorService.getAuthors().then((authors) => {
      this.authors = authors;
    })
    this.bookService.getAllBooks(this.bookName, this.getAuthorId()).then((books: Book[]) => {
      this.bookTotal = books.length;
    });
    this.bookService.getBooksPaginationAndFilter(0, this.bookName, this.pageNumber, this.pageSize).then((books: Book[]) => {
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

  public goToPreviousPage() {
    if (this.pageNumber - 1 > 0) {
      this.pageNumber-- ;
      this.bookService.getBooksPaginationAndFilter(this.getAuthorId(), this.bookName, this.pageNumber, this.pageSize).then((books: Book[]) => {
        this.books = books;
      });
    }
  }

  public goToNextPage() {
    let pagemax = (this.bookTotal / this.pageSize) ;
    if ( this.bookTotal % this.pageSize !== 0) {
      pagemax++ ;
    }
    if (this.pageNumber + 1 < pagemax) {
      this.pageNumber++ ;
      this.bookService.getBooksPaginationAndFilter(this.getAuthorId(), this.bookName, this.pageNumber, this.pageSize).then((books: Book[]) => {
        this.books = books;
      });
    }
  }

  search() {
    this.bookService.getAllBooks(this.bookName, this.getAuthorId()).then((books: Book[]) => {
      this.bookTotal = books.length;
    });
    let authorId = this.getAuthorId();
    this.bookService.getBooksPaginationAndFilter(authorId, this.bookName, this.pageNumber, this.pageSize).then((books: Book[]) => {
      this.books = books;
    });
  }

  dropdownChanged(authorSelected:Author) {
    this.bookService.getAllBooks(this.bookName, this.getAuthorId()).then((books: Book[]) => {
      this.bookTotal = books.length;
    });
    this.bookService.getBooksPaginationAndFilter(authorSelected.id, this.bookName, this.pageNumber, this.pageSize).then((books: Book[]) => {
      this.books = books;
    });
  }

  getAuthorId(): number {
    let authorId = 0;
    if ( this.authorSelected != null && this.authorSelected.id != undefined) {
      authorId = this.authorSelected.id;
    }
    return authorId;
  }
}

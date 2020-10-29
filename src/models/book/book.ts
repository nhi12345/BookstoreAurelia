export class Book {
  id: number;
  name: string;
  description: string;
  price: number;
  year: number;
  publisher: string;
  cover: string;
  author: Author;
  categories: any[] = [];
  constructor(name: string, description: string, price: number, year: number, publisher: string, cover: string, author: Author) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.year = year;
    this.publisher = publisher;
    this.cover = cover;
    this.author = author;
  }
}

export class Author {
  id: number;
  name: string;
  website: string;
  birthday: string;
  cover: string;
}
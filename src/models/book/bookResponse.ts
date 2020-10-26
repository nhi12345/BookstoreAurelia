export class BookResponse {
  id: number;
  name: string;
  description: string;
  price: string;
  year: number;
  publisher: string;
  cover: string;
  author: Author;
}

export class Author {
  id: number;
  name: string;
  website: string;
  birthday: string;
  cover: string;
}
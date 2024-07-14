import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../components/books/books';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  updateAuthorById(_id: any, book: Book) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/book';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/read`);
  }

  addBook(book: Book): Observable<Book> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Book>(`${this.apiUrl}/create`, book, httpOptions);
  }

  updateBookById(id: string, updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/update/${id}`, updatedBook);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

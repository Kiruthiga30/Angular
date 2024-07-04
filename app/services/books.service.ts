import { Injectable } from '@angular/core';//used to define a class as a service that can be injected into other componenets or service 
import { HttpClient } from '@angular/common/http';//allows to crud op to interact with backend server
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' //metadata that the service can be singleton and used throughout the appl
})

export class BooksService { //class
  private backendUrl = "http://localhost:4000/book";
  constructor(private http: HttpClient) { }
  addBook(book: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/create`, book);
  }

  updateBook(book: any): Observable<any> {
    return this.http.put(`${this.backendUrl}/update/${book.bookid}`, book);
  }

  deleteBook(bookid: number): Observable<any> {
    return this.http.delete(`${this.backendUrl}/delete/${bookid}`);
  }

  getBook(): Observable<any> {
    return this.http.get(`${this.backendUrl}/read`);
  }
}
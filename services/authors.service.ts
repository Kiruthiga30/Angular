import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../components/authors/authors';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = 'http://localhost:8000/author';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/read`);
  }

  addAuthor(author: Author): Observable<Author> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Author>(`${this.apiUrl}/create`, author, httpOptions);
  }

  updateAuthorById(id: string, updatedAuthor: Author): Observable<Author> {
    return this.http.put<Author>(`${this.apiUrl}/update/${id}`, updatedAuthor);
  }

  deleteAuthor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}

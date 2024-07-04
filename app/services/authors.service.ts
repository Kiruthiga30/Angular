import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthorsService {
  private backEndUrl = "http://localhost:4000/author";

  constructor(private http: HttpClient) { }
  addAuthor(author: any): Observable<any> {
    return this.http.post(`${this.backEndUrl}/create`, author);
  }

  updateAuthor(author: any): Observable<any> {
    return this.http.put(`${this.backEndUrl}/update/${author.id}`, author);
  }

  deleteAuthor(id: number): Observable<any> {
    return this.http.delete(`${this.backEndUrl}/delete/${id}`);
  }

  getAuthor(): Observable<any> {
    return this.http.get<any[]>(`${this.backEndUrl}/read`);
  }
}

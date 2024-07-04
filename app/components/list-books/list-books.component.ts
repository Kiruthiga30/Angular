import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-list-books',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-books.component.html',
  styleUrl: './list-books.component.css'
})
export class ListBooksComponent {
  books: any[] = [];
  totalBooks: number = 0;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.bookService.getBook().subscribe(res => {
      this.books = res;
      this.totalBooks = this.books.length;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-search-books',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-books.component.html',
  styleUrl: './search-books.component.css'
})

export class SearchBooksComponent implements OnInit {
  books: any[] = [];
  filterBooks: any[] = [];
  searchTerm: string = '';

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.bookService.getBook().subscribe(res => {
      this.books = res;
      this.filterBooks = res; // Initialize with all books
    });
  }
  
  Search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filterBooks = this.books.filter(book =>
      (book.title && book.title.toLowerCase().includes(term)) ||
      (book.authorid && book.authorid.toString().includes(term)) ||
      (book.bookid && book.bookid.toString().includes(term)) ||
      (book.publishedDate && book.publishedDate.toLowerCase().includes(term))
    );
  }
}
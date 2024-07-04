import { Component, OnInit } from '@angular/core';//onint lifecycle hook that will be called after ang initialized all properities of component
import { FormsModule, NgForm } from '@angular/forms';//used to create template form
import { CommonModule } from '@angular/common';
import { BooksService } from '../../services/books.service';//provide methods to perform crud op
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  title = "bookForm";
  model = { bookid: '', title: '', authorId: '', publishedDate: '' };
  constructor(private bookService: BooksService, private router: Router) { }

  addBook(book: any) {
    this.bookService.addBook(book).subscribe(res => {
      this.router.navigate(['/result'], { queryParams: { message: 'Book added', book: JSON.stringify(res) } });
      console.log('Book added:', res);
    });
  }

  updateBook(book: any) {
    this.bookService.updateBook(book).subscribe(res => {
      this.router.navigate(['/result'], { queryParams: { message: 'Book Updated', book: JSON.stringify(res) } });
      console.log('Book updated:', res);
    });
  }

  deleteBook(bookid: number) {
    this.bookService.deleteBook(bookid).subscribe(res => {
      this.router.navigate(['/result'], { queryParams: { message: 'Book Deleted' } });
      console.log('Book deleted:', res);
    });
  }

  displayAllBooks() {
    this.router.navigate(['/allBooks']);
  }
}

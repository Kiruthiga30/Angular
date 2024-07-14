import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/books.service';
import { Book } from '../books/books';
import { bookDeleteComponent } from '../book-delete/book-delete.component';
import { UpdateBookComponent } from '../book-update/book-update.component';
import moment from 'moment'; //momentum for date
import { Author } from '../authors/authors';
import { MatIconModule } from '@angular/material/icon';
import { AuthorService } from '../../services/authors.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [MatIconModule, FormsModule, CommonModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatTableModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BookComponent implements OnInit {
  books: Book[] = [];
  authors: Author[] = [];
  displayCols: string[] = ['title', 'journal', 'authorId', 'publishedDate', 'action'];
  filterBooks: Book[] = [];
  searchText: string = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBooksAndAuthors();
  }

  loadBooksAndAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.bookService.getBooks().subscribe(books => {
        this.books = books.map(book => {
          const author = this.authors.find(a => a._id === book.authorId);
          return {
            ...book,
            authorName: author ? author.name : 'Unknown Author'
          };
        });
        this.filterBooks = this.books;
      });
    });
  }

  getAuthorName(authorId: string): string {
    const author = this.authors.find(a => a._id === authorId);
    return author ? author.name : 'Unknown Author';
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.books = data.map(book => {
        book.publishedDate = moment(book.publishedDate).format('YYYY-MM-DD');
        return book;
      });
      this.filterBooks = this.books;
    });
  }

  openAddBook(): void {
    const dialogRef = this.dialog.open(BookFormComponent, {
      width: '300px',
      data: { authors: this.authors }
    });

    dialogRef.afterClosed().subscribe(result => {
      try {
        if (result) {
          console.log('New book data received:', result);
          const newBook = {
            ...result,
            publishedDate: moment(result.publishedDate).format('YYYY-MM-DD')
          };

          console.log('Formatted new book data:', newBook);

          this.bookService.addBook(newBook).subscribe((book) => {
            book.authorName = this.getAuthorName(book.authorId);
            this.books.push(book);
            this.loadBooks();
            this.applyFilter();
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  editBook(book: Book): void {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      width: '400px',
      data: { book }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateBook(result);
        this.filterBooks = [...this.books];
      }
    });
  }

  updateBook(updatedBook: Book): void {
    this.bookService.updateBookById(updatedBook._id, updatedBook).subscribe(() => {
      this.loadBooksAndAuthors(); // Refresh the book list after update
    });
  }

  confirmDelete(book: Book): void {
    const dialogRef = this.dialog.open(bookDeleteComponent, {
      width: '300px',
      data: { message: 'Are you sure, do you want to delete this book?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteBook(book._id!);
      }
    });
  }

  deleteBook(bookId: number): void {
    this.bookService.deleteBook(bookId).subscribe(() => {
      this.books = this.books.filter(b => b._id !== bookId); // Remove from frontend
      this.filterBooks = this.filterBooks.filter(b => b._id !== bookId);
    });
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filterBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(filterValue) ||
      book.journal.toLowerCase().includes(filterValue)
    );
  }
}

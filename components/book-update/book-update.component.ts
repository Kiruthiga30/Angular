import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BookService } from '../../services/books.service';
import { AuthorService } from '../../services/authors.service';
import { Book } from '../books/books';
import { Author } from '../authors/authors';

@Component({
  selector: 'app-book-update',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatTableModule],
  templateUrl: './book-update.component.html',
  styleUrl: './book-update.component.css'
})

export class UpdateBookComponent implements OnInit {
  book: Book;
  authors: Author[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private booksService: BookService,
    private authorsService: AuthorService
  ) {
    this.book = data.book;
  }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorsService.getAuthors().subscribe(
      (data: Author[]) => {
        this.authors = data;
      }
    );
  }

  Submit(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    this.booksService.updateBookById(this.book._id, this.book).subscribe(
      (updatedBook) => {
        console.log(updatedBook);
        this.dialogRef.close(updatedBook);
      }
    );
  }

  Cancel(): void {
    this.dialogRef.close();
  }
}

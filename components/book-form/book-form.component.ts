import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Book } from '../books/books';
import { Author } from '../authors/authors';
import moment from 'moment';
import { BookService } from '../../services/books.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})

export class BookFormComponent {
  book: Book = {
    title: '',
    journal: '',
    authorId: '',
    publishedDate: '',
    _id: undefined,
  };

  authors: Author[];

  constructor(
    private bookService: BookService,
    public dialogRef: MatDialogRef<BookFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { authors: Author[] }
  ) {
    this.authors = data.authors;
  }

  noClick(): void {
    this.dialogRef.close();
  }

  addClick(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const formValue = form.value;

    if (formValue.publishedDate) {
      formValue.publishedDate = moment(formValue.publishedDate).format('YYYY-MM-DD');
    }
    this.bookService.addBook(formValue).subscribe(
      res => {
        this.dialogRef.close(res);
      }
    );
  }
}




import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Author } from './authors';
import { AuthorService } from '../../services/authors.service';
import { AuthorFormComponent } from '../author-form/author-form.component';
import { authorDeleteComponent } from '../author-delete/author-delete.component';
import { UpdateAuthorComponent } from '../author-update/author-update.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatIconModule, CommonModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatTableModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})

export class AuthorComponent implements OnInit {
  authors: Author[] = [];
  filterAuthors: Author[] = [];
  searchText: string = '';
  displayedColumns: string[] = ['name', 'bio', 'action'];

  constructor(private authorsService: AuthorService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors(): void {
    this.authorsService.getAuthors().subscribe(
      (data: Author[]) => {
        this.authors = data;
        this.filterAuthors = this.authors;
      }
    );
  }

  openAddAuthor(): void {
    const dialogRef = this.dialog.open(AuthorFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAuthor(result);
        this.applyFilter();
      }
    });
  }

  openEditAuthor(author: Author): void {
    const dialogRef = this.dialog.open(UpdateAuthorComponent, {
      width: '400px',
      data: { author }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateAuthor(result);
        this.filterAuthors = [...this.authors];
      }
    });
  }

  updateAuthor(updatedAuthor: Author): void {
    this.authorsService.updateAuthorById(updatedAuthor._id, updatedAuthor).subscribe(() => {
      this.loadAuthors(); // Refresh the book list after update
    });
  }

  confirmDelete(author: Author): void {
    const dialogRef = this.dialog.open(authorDeleteComponent, {
      width: '300px',
      data: { message: 'Are you sure you want to delete this author?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAuthor(author._id!); // Ensure _id is not undefined
      }
    });
  }

  addAuthor(author: Author): void {
    this.authorsService.addAuthor(author).subscribe(newAuthor => {
      this.authors.push(newAuthor);
      this.loadAuthors();
    });
  }

  deleteAuthor(authorId: number): void {
    this.authorsService.deleteAuthor(authorId).subscribe(() => {
      this.authors = this.authors.filter(a => a._id !== authorId); // Remove from frontend
      this.filterAuthors = this.filterAuthors.filter(a => a._id !== authorId);
    });
  }

  applyFilter(): void {
    const filterValue = this.searchText.toLowerCase();
    this.filterAuthors = this.authors.filter(author =>
      author.name.toLowerCase().includes(filterValue) ||
      (author.bio && author.bio.toLowerCase().includes(filterValue))
    );
  }
}

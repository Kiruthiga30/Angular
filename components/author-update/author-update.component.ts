import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorService } from '../../services/authors.service';
import { Author } from '../authors/authors';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatTableModule],
  templateUrl: './author-update.component.html',
  styleUrl: './author-update.component.css'
})

export class UpdateAuthorComponent {
  author: Author;

  constructor(
    public dialogRef: MatDialogRef<UpdateAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { author: Author },
    private authorsService: AuthorService
  ) {
    this.author = { ...data.author };
  }

  noClick(): void {
    this.dialogRef.close();
  }

  updateClick(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.authorsService.updateAuthorById(this.author._id, this.author).subscribe(updatedAuthor => {
      this.dialogRef.close(updatedAuthor);
    });
  }
}
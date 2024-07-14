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
import { Author } from '../authors/authors';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [FormsModule, CommonModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatTableModule],
  templateUrl: './author-form.component.html',
  styleUrl: './author-form.component.css'
})

export class AuthorFormComponent {
  author: Author = {
    name: '', bio: '',
    _id: undefined
  };

  constructor(public dialogRef: MatDialogRef<AuthorFormComponent>) { }

  onClick(): void {
    this.dialogRef.close();
  }
}

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-book-delete',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './book-delete.component.html',
  styleUrls: ['./book-delete.component.css']
})

export class bookDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<bookDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  noClick(): void {
    this.dialogRef.close(false);
  }

  yesClick(): void {
    this.dialogRef.close(true);
  }
}

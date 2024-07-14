import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-author-delete',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './author-delete.component.html',
  styleUrls: ['./author-delete.component.css']
})

export class authorDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<authorDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}

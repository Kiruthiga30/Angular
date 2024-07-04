import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list-authors.component.html',
  styleUrl: './list-authors.component.css'
})
export class ListAuthorsComponent implements OnInit {
  authors: any[] = [];
  totalAuthors: number = 0;

  constructor(private authorService: AuthorsService) { }

  ngOnInit(): void {
    this.authorService.getAuthor().subscribe(res => {
      this.authors = res;
      this.totalAuthors = this.authors.length;
    });
  }
}

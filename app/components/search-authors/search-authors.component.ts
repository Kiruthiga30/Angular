import { Component, OnInit } from '@angular/core';
import { AuthorsService } from '../../services/authors.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-authors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-authors.component.html',
  styleUrl: './search-authors.component.css'
})

export class SearchAuthorsComponent implements OnInit {
  authors: any[] = [];
  filterAuthors: any[] = [];
  searchTerm: string = '';

  constructor(private authorService: AuthorsService) { }

  ngOnInit(): void {
    this.authorService.getAuthor().subscribe(res => {
      this.authors = res;
      this.filterAuthors = res; // Initialize with all authors
    });
  }

  Search(): void {
    const term = this.searchTerm.toLowerCase();
    this.filterAuthors = this.authors.filter(author =>
      (author.name && author.name.toLowerCase().includes(term)) ||
      (author.id && author.id.toString().includes(term)) ||
      (author.bio && author.bio.toLowerCase().includes(term))
    );
  }
}


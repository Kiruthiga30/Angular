import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthorsService } from '../../services/authors.service';
import { Router } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
  title = "authorForm";
  model = { id: '', name: '', bio: '' };
  constructor(private authorService: AuthorsService, private router: Router) { }//inject the service into component
  addAuthor(author: any) {
    this.authorService.addAuthor(author).subscribe(res => {
      this.router.navigate(['/results'], { queryParams: { message: 'Author added', author: JSON.stringify(res) } });
      console.log('author added:', res);
    });
  }

  updateAuthor(author: any) {
    this.authorService.updateAuthor(author).subscribe(res => {
      this.router.navigate(['/results'], { queryParams: { message: 'Author Updated', author: JSON.stringify(res) } });
      console.log('author updated:', res);
    });
  }

  deleteAuthor(authorid: number) {
    this.authorService.deleteAuthor(authorid).subscribe(res => {
      this.router.navigate(['/results'], { queryParams: { message: 'Author Deleted' } });
      console.log('author deleted:', res);
    });
  }

  displayAllAuthors() {
    this.router.navigate(['/allAuthors']);
  }
}

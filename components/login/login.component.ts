import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  errMsg: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  onSubmit(form: any): void {
    if (form.valid) {
      const user = form.value;
      this.authService.login(user).subscribe(
        res => {
          console.log(res);
          this.redirectRole();
        }
      );
    } else {
      this.errMsg = 'Please Enter All the fields';
    }
    this.authService.login(form.value).subscribe(
      response => {
        console.log('User logged in successfully', response);
      },
      error => {
        if (error.status === 404) {
          this.errMsg = 'Invalid email or password';
        } else {
          this.errMsg = 'An error occurred,Please try again later';
        }
        console.error('Login error', error);
      }
    );
  }

  private redirectRole(): void {
    const roles = this.authService.getUserRoles();
    console.log(roles);
    if (roles.includes('admin')) {
      this.router.navigate(['/home']);
    } else if (roles.includes('bookmanager')) {
      this.router.navigate(['/book']);
    } else if (roles.includes('authormanager')) {
      this.router.navigate(['/author']);
    } else {
      this.router.navigate(['/register']);
    }
  }
}

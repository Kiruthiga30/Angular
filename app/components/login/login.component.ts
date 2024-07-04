import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = "loginForm";

  constructor(private authService: AuthService, private router: Router) { }

  model: { email: string, password: string } = { email: '', password: '' };

  Submit(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.login(loginForm.value).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}



import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = "registerForm";

  constructor(private authService: AuthService, private router: Router) { }

  model: { username: string, email: string, password: string, role: string } = { email: '', username: '', password: '', role: '' };

  Submit(registerForm: NgForm) {
    if (registerForm.valid) {
      this.authService.register(registerForm.value).subscribe(() => {
        this.router.navigate(['/login']);
      })
    }
  }
}

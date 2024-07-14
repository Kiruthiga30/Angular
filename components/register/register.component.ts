import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  roles: string[] = [];
  errMsg: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.authService.getRoles().subscribe(
      data => {
        this.roles = data;
      }
    )
  };

  onSubmit(form: any): void {
    if (form.valid) {
      const user = form.value;
      this.authService.register(user).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login']);
        }
      );
    }
    else {
      this.errMsg = 'Please Enter All The Fields';
    }
    this.authService.register(form.value).subscribe(
      res => {
        console.log('User registered successfully', res);
      },
      error => {
        if (error.status === 400) {
          this.errMsg = 'User already registered with this email';
        } else {
          this.errMsg = 'An error occurred,Please try again later';
        }
        console.error('Registration error', error);
      }
    );
  }
}


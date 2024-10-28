import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthfirebaseService } from '../../services/authfirebase.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
})

export class SignUpComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthfirebaseService);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService.register(rawForm.email,rawForm.username, rawForm.password ).subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      },
      error: (err) =>{
        this.errorMessage = err.code;
      }
    })
  }
}
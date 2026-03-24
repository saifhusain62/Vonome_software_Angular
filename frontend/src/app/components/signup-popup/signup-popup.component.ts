import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  imports: [CommonModule, FormsModule],
})
export class SignupPopupComponent implements OnInit, OnDestroy {
  showPopup: boolean = false;
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  agreeTerms: boolean = false;
  isLoading: boolean = false;
  private subscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.showSignupPopup$.subscribe((show) => {
      this.showPopup = show;
      if (show) {
        this.resetForm();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closePopup(): void {
    this.authService.closeAllPopups();
  }

  switchToLogin(): void {
    this.authService.openLoginPopup();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    if (!this.agreeTerms) {
      this.errorMessage = 'Please agree to the terms and conditions';
      return;
    }

    this.isLoading = true;
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Signup successful', response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Signup failed. Please try again.';
      },
    });
  }

  private resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.errorMessage = '';
    this.agreeTerms = false;
    this.isLoading = false;
  }
}
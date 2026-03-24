import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  imports: [CommonModule, FormsModule],
})
export class LoginPopupComponent implements OnInit, OnDestroy {
  showPopup: boolean = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showPassword: boolean = false;
  isLoading: boolean = false;
  private subscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.showLoginPopup$.subscribe((show) => {
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

  switchToSignup(): void {
    this.authService.openSignupPopup();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login successful', response);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage =
          error.error?.message || 'Invalid email or password';
      },
    });
  }

  private resetForm(): void {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
    this.isLoading = false;
  }
}
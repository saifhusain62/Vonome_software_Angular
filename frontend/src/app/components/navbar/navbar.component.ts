import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [CommonModule, FormsModule, RouterModule],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  showUserMenu: boolean = false;
  searchQuery: string = '';
  private subscriptions: Subscription[] = [];

  @Output() menuClick = new EventEmitter<void>();

  constructor(
    public authService: AuthService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe((status) => {
        this.isLoggedIn = status;
      }),
      this.authService.currentUser$.subscribe((user) => {
        this.currentUser = user;
      })
    );

    // Load user profile if logged in
    if (this.isLoggedIn) {
      this.authService.getProfile().subscribe();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getProfilePictureUrl(): string {
    return this.authService.getProfilePictureUrl(
      this.currentUser?.profilePicture
    );
  }

  getUserInitial(): string {
    return this.currentUser?.name?.charAt(0)?.toUpperCase() || 'U';
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  openLoginPopup(): void {
    this.showUserMenu = false;
    this.authService.openLoginPopup();
  }

  openSignupPopup(): void {
    this.showUserMenu = false;
    this.authService.openSignupPopup();
  }

  logout(): void {
    this.showUserMenu = false;
    this.authService.logout();
  }

  onSearch(): void {
    this.productService.searchProducts(this.searchQuery);
  }

  onMenuClick(): void {
    this.menuClick.emit();
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
    this.showUserMenu = false;
    this.searchQuery = '';
  }
}
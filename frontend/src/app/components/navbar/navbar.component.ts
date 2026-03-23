import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  imports: [CommonModule, FormsModule], 
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  showUserMenu: boolean = false;
  searchQuery: string = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.isLoggedIn$.subscribe(status => {
        this.isLoggedIn = status;
      }),
      this.authService.currentUser$.subscribe(user => {
        this.currentUser = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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
}
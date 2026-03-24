import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoginPopupComponent } from '../../components/login-popup/login-popup.component';
import { SignupPopupComponent } from '../../components/signup-popup/signup-popup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule, 
    ProductListComponent, 
    ProductCardComponent, 
    SidebarComponent, 
    NavbarComponent, 
    LoginPopupComponent, 
    SignupPopupComponent
  ]
})
export class HomeComponent {
  isMobile: boolean = false;
  sidebarOpen: boolean = false;

  constructor() {
    this.checkScreenSize();
  }

 @HostListener('window:resize')
onResize() {
  console.log('Window resized');
}

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.sidebarOpen = false; // Reset when switching to desktop
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
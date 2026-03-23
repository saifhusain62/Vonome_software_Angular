import { Component } from '@angular/core';
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
  imports: [CommonModule, ProductListComponent, ProductCardComponent, SidebarComponent, NavbarComponent, LoginPopupComponent, SignupPopupComponent]
})
export class HomeComponent {}
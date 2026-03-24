import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FormsModule } from '@angular/forms';

interface DeliveryDetails {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  notes: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule, ProductCardComponent, FormsModule]
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedCategory: string = 'All';
  sortBy: string = 'default';
  cartCount: number = 0;
  showCart: boolean = false;
  showDeliveryForm: boolean = false;
  cartItems: any[] = [];
  cartTotal: number = 0;
  private subscriptions: Subscription[] = [];

  deliveryDetails: DeliveryDetails = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    notes: ''
  };

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.productService.filteredProducts$.subscribe(products => {
        this.products = this.sortProducts(products);
      }),
      this.productService.selectedCategory$.subscribe(category => {
        this.selectedCategory = category;
      }),
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
        this.cartCount = this.cartService.getCartCount();
        this.cartTotal = this.cartService.getCartTotal();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSortChange(event: Event): void {
    this.sortBy = (event.target as HTMLSelectElement).value;
    this.products = this.sortProducts(this.products);
  }

  private sortProducts(products: Product[]): Product[] {
    const sorted = [...products];
    switch (this.sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  proceedToPay(): void {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    this.showCart = false;
    this.showDeliveryForm = true;
  }

  closeDeliveryForm(): void {
    this.showDeliveryForm = false;
  }

  submitOrder(): void {
    // Validate form
    if (!this.deliveryDetails.name || !this.deliveryDetails.email || 
        !this.deliveryDetails.phone || !this.deliveryDetails.address || 
        !this.deliveryDetails.city || !this.deliveryDetails.zipCode) {
      alert('Please fill in all required fields!');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.deliveryDetails.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    // Phone validation (basic)
    const phoneRegex = /^[0-9]{10,}$/;
    if (!phoneRegex.test(this.deliveryDetails.phone.replace(/[\s-]/g, ''))) {
      alert('Please enter a valid phone number!');
      return;
    }

    // Process order
    const orderData = {
      deliveryDetails: this.deliveryDetails,
      cartItems: this.cartItems,
      total: this.cartTotal,
      orderDate: new Date()
    };

    console.log('Order submitted:', orderData);
    
    // Here you would typically send this to your backend
    alert(`Order confirmed! Total: $${this.cartTotal.toFixed(2)}\n\nDelivery to: ${this.deliveryDetails.name}\n${this.deliveryDetails.address}, ${this.deliveryDetails.city}`);
    
    // Clear cart and form
    this.cartService.clearCart();
    this.resetDeliveryForm();
    this.showDeliveryForm = false;
  }

  private resetDeliveryForm(): void {
    this.deliveryDetails = {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      notes: ''
    };
  }
}
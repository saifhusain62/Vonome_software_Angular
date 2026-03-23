import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  private cartTotal = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotal.asObservable();

  private showCartPopup = new BehaviorSubject<boolean>(false);
  showCartPopup$ = this.showCartPopup.asObservable();

  private toastMessage = new BehaviorSubject<string | null>(null);
  toastMessage$ = this.toastMessage.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const saved = localStorage.getItem('medishop_cart');
    if (saved) {
      try {
        const items: CartItem[] = JSON.parse(saved);
        this.cartItems.next(items);
        this.updateCountAndTotal(items);
      } catch {
        localStorage.removeItem('medishop_cart');
      }
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    localStorage.setItem('medishop_cart', JSON.stringify(items));
  }

  private updateCountAndTotal(items: CartItem[]): void {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.cartCount.next(count);
    this.cartTotal.next(total);
  }

  addToCart(product: { id: string; name: string; price: number; image?: string }, quantity: number = 1): void {
    const currentItems = [...this.cartItems.value];
    const existingIndex = currentItems.findIndex(item => item.productId === product.id);

    if (existingIndex > -1) {
      currentItems[existingIndex] = {
        ...currentItems[existingIndex],
        quantity: currentItems[existingIndex].quantity + quantity
      };
      this.showToast(`${product.name} quantity updated in cart!`);
    } else {
      currentItems.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.image
      });
      this.showToast(`${product.name} added to cart!`);
    }

    this.cartItems.next(currentItems);
    this.updateCountAndTotal(currentItems);
    this.saveCartToStorage(currentItems);
  }

  removeFromCart(productId: string): void {
    const currentItems = this.cartItems.value.filter(item => item.productId !== productId);
    this.cartItems.next(currentItems);
    this.updateCountAndTotal(currentItems);
    this.saveCartToStorage(currentItems);
    this.showToast('Item removed from cart');
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const currentItems = this.cartItems.value.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );

    this.cartItems.next(currentItems);
    this.updateCountAndTotal(currentItems);
    this.saveCartToStorage(currentItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
    this.cartCount.next(0);
    this.cartTotal.next(0);
    localStorage.removeItem('medishop_cart');
    this.showToast('Cart cleared');
  }

  toggleCartPopup(): void {
    this.showCartPopup.next(!this.showCartPopup.value);
  }

  closeCartPopup(): void {
    this.showCartPopup.next(false);
  }

  private showToast(message: string): void {
    this.toastMessage.next(message);
    setTimeout(() => {
      this.toastMessage.next(null);
    }, 3000);
  }
}
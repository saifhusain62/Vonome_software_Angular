import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  imports: [CommonModule]
})
export class ProductCardComponent {
  @Input() product: any;

  fallbackImage = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop';
  showAddedMessage: boolean = false;

  constructor(private cartService: CartService) {}

  getStars(rating: number): string[] {
    const stars: string[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar && stars.length < 5) {
      stars.push('✨');
    }
    return stars;
  }

  getDiscount(): number {
    return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
  }

  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = this.fallbackImage;
  }

  addToCart(): void {
    if (this.product.inStock) {
      this.cartService.addToCart(this.product);
      this.showAddedMessage = true;
      setTimeout(() => {
        this.showAddedMessage = false;
      }, 2000);
    }
  }
}
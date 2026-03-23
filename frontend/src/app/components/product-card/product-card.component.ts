import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  imports: [CommonModule]
})
export class ProductCardComponent {
  @Input() product: any;

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
}
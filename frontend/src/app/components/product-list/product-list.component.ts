import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  imports: [CommonModule,ProductCardComponent]
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  selectedCategory: string = 'All';
  sortBy: string = 'default';
  private subscriptions: Subscription[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.productService.filteredProducts$.subscribe(products => {
        this.products = this.sortProducts(products);
      }),
      this.productService.selectedCategory$.subscribe(category => {
        this.selectedCategory = category;
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
}
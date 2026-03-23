import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule]
})
export class SidebarComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  selectedCategory: string = 'All';
  private subscriptions: Subscription[] = [];

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getAllCategories();
    this.subscriptions.push(
      this.productService.selectedCategory$.subscribe(category => {
        this.selectedCategory = category;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectCategory(categoryName: string): void {
    this.productService.filterByCategory(categoryName);
  }
}
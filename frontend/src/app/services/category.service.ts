import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    { id: 1, name: 'All', icon: '', count: 54 },
    { id: 2, name: 'Pain Relief', icon: '', count: 3 },
    { id: 3, name: 'Antibiotics', icon: '', count: 3 },
    { id: 4, name: 'Vitamins', icon: '', count: 4 },
    { id: 5, name: 'Allergy', icon: '', count: 3 },
    { id: 6, name: 'Digestive', icon: '', count: 3 },
    { id: 7, name: 'Diabetes', icon: '', count: 3 },
    { id: 8, name: 'Heart Health', icon: '', count: 3 },
    { id: 9, name: 'Cold & Flu', icon: '', count: 3 },
    { id: 10, name: 'Respiratory', icon: '', count: 3 },
    { id: 11, name: 'Skin Care', icon: '', count: 4 },
    { id: 12, name: 'Eye Care', icon: '', count: 3 },
    { id: 13, name: 'Bone Health', icon: '', count: 2 },
    { id: 14, name: 'Supplements', icon: '', count: 5 },
    { id: 15, name: 'Sleep Aid', icon: '', count: 2 },
    { id: 16, name: 'First Aid', icon: '', count: 3 },
    { id: 17, name: 'Medical Devices', icon: '', count: 4 },
    { id: 18, name: 'Safety', icon: '', count: 3 }
  ];

  getAllCategories(): Category[] {
    return this.categories;
  }
}
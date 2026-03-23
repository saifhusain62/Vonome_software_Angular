import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Paracetamol 500mg', description: 'Pain relief and fever reducer', price: 5.99, originalPrice: 7.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Pain Relief', inStock: true, rating: 4.5, reviews: 120 },
    { id: 2, name: 'Ibuprofen 400mg', description: 'Anti-inflammatory pain relief', price: 8.99, originalPrice: 10.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Pain Relief', inStock: true, rating: 4.3, reviews: 89 },
    { id: 3, name: 'Aspirin 300mg', description: 'Blood thinner and pain relief', price: 4.99, originalPrice: 6.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Pain Relief', inStock: true, rating: 4.7, reviews: 156 },
    { id: 4, name: 'Amoxicillin 500mg', description: 'Antibiotic for bacterial infections', price: 12.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Antibiotics', inStock: true, rating: 4.6, reviews: 78 },
    { id: 5, name: 'Azithromycin 250mg', description: 'Broad spectrum antibiotic', price: 15.99, originalPrice: 19.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Antibiotics', inStock: false, rating: 4.4, reviews: 92 },
    { id: 6, name: 'Ciprofloxacin 500mg', description: 'Fluoroquinolone antibiotic', price: 18.99, originalPrice: 22.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Antibiotics', inStock: true, rating: 4.2, reviews: 67 },
    { id: 7, name: 'Vitamin C 1000mg', description: 'Immune system booster', price: 9.99, originalPrice: 12.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Vitamins', inStock: true, rating: 4.8, reviews: 234 },
    { id: 8, name: 'Vitamin D3 5000IU', description: 'Bone health and immunity', price: 11.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Vitamins', inStock: true, rating: 4.7, reviews: 189 },
    { id: 9, name: 'Vitamin B Complex', description: 'Energy and nerve health', price: 13.99, originalPrice: 16.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Vitamins', inStock: true, rating: 4.5, reviews: 145 },
    { id: 10, name: 'Multivitamin Daily', description: 'Complete daily nutrition', price: 19.99, originalPrice: 24.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Vitamins', inStock: true, rating: 4.6, reviews: 312 },
    { id: 11, name: 'Cetirizine 10mg', description: 'Antihistamine for allergies', price: 6.99, originalPrice: 8.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Allergy', inStock: true, rating: 4.4, reviews: 98 },
    { id: 12, name: 'Loratadine 10mg', description: 'Non-drowsy allergy relief', price: 7.99, originalPrice: 9.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Allergy', inStock: true, rating: 4.5, reviews: 112 },
    { id: 13, name: 'Fexofenadine 180mg', description: '24-hour allergy relief', price: 12.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Allergy', inStock: true, rating: 4.3, reviews: 76 },
    { id: 14, name: 'Omeprazole 20mg', description: 'Acid reflux treatment', price: 14.99, originalPrice: 18.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Digestive', inStock: true, rating: 4.6, reviews: 167 },
    { id: 15, name: 'Ranitidine 150mg', description: 'Heartburn relief', price: 8.99, originalPrice: 11.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Digestive', inStock: false, rating: 4.2, reviews: 89 },
    { id: 16, name: 'Loperamide 2mg', description: 'Anti-diarrheal medication', price: 5.99, originalPrice: 7.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Digestive', inStock: true, rating: 4.4, reviews: 134 },
    { id: 17, name: 'Metformin 500mg', description: 'Diabetes management', price: 9.99, originalPrice: 12.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Diabetes', inStock: true, rating: 4.7, reviews: 245 },
    { id: 18, name: 'Glimepiride 2mg', description: 'Blood sugar control', price: 11.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Diabetes', inStock: true, rating: 4.5, reviews: 178 },
    { id: 19, name: 'Insulin Pen', description: 'Insulin delivery device', price: 45.99, originalPrice: 55.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Diabetes', inStock: true, rating: 4.8, reviews: 89 },
    { id: 20, name: 'Amlodipine 5mg', description: 'Blood pressure control', price: 7.99, originalPrice: 9.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Heart Health', inStock: true, rating: 4.6, reviews: 198 },
    { id: 21, name: 'Lisinopril 10mg', description: 'ACE inhibitor for BP', price: 8.99, originalPrice: 11.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Heart Health', inStock: true, rating: 4.5, reviews: 167 },
    { id: 22, name: 'Atorvastatin 20mg', description: 'Cholesterol management', price: 12.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Heart Health', inStock: true, rating: 4.7, reviews: 234 },
    { id: 23, name: 'Cough Syrup', description: 'Dry and wet cough relief', price: 6.99, originalPrice: 8.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Cold & Flu', inStock: true, rating: 4.3, reviews: 156 },
    { id: 24, name: 'Nasal Spray', description: 'Congestion relief', price: 8.99, originalPrice: 10.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Cold & Flu', inStock: true, rating: 4.4, reviews: 123 },
    { id: 25, name: 'Throat Lozenges', description: 'Sore throat relief', price: 4.99, originalPrice: 6.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Cold & Flu', inStock: true, rating: 4.5, reviews: 189 },
    { id: 26, name: 'Salbutamol Inhaler', description: 'Asthma relief inhaler', price: 24.99, originalPrice: 29.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Respiratory', inStock: true, rating: 4.8, reviews: 145 },
    { id: 27, name: 'Montelukast 10mg', description: 'Asthma prevention', price: 18.99, originalPrice: 22.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Respiratory', inStock: true, rating: 4.6, reviews: 112 },
    { id: 28, name: 'Fluticasone Spray', description: 'Nasal corticosteroid', price: 22.99, originalPrice: 27.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Respiratory', inStock: true, rating: 4.5, reviews: 98 },
    { id: 29, name: 'Hydrocortisone Cream', description: 'Anti-itch cream', price: 7.99, originalPrice: 9.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Skin Care', inStock: true, rating: 4.4, reviews: 167 },
    { id: 30, name: 'Antifungal Cream', description: 'Fungal infection treatment', price: 9.99, originalPrice: 12.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Skin Care', inStock: true, rating: 4.3, reviews: 134 },
    { id: 31, name: 'Sunscreen SPF 50', description: 'Sun protection lotion', price: 14.99, originalPrice: 18.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Skin Care', inStock: true, rating: 4.7, reviews: 256 },
    { id: 32, name: 'Moisturizing Lotion', description: 'Deep skin hydration', price: 11.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Skin Care', inStock: true, rating: 4.6, reviews: 198 },
    { id: 33, name: 'Eye Drops', description: 'Dry eye relief', price: 8.99, originalPrice: 10.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Eye Care', inStock: true, rating: 4.5, reviews: 145 },
    { id: 34, name: 'Contact Lens Solution', description: 'Lens cleaning solution', price: 12.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Eye Care', inStock: true, rating: 4.6, reviews: 178 },
    { id: 35, name: 'Antibiotic Eye Drops', description: 'Eye infection treatment', price: 15.99, originalPrice: 19.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Eye Care', inStock: true, rating: 4.4, reviews: 89 },
    { id: 36, name: 'Calcium + D3', description: 'Bone strength supplement', price: 13.99, originalPrice: 16.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Bone Health', inStock: true, rating: 4.7, reviews: 212 },
    { id: 37, name: 'Glucosamine 1500mg', description: 'Joint health support', price: 19.99, originalPrice: 24.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Bone Health', inStock: true, rating: 4.5, reviews: 167 },
    { id: 38, name: 'Omega-3 Fish Oil', description: 'Heart and brain health', price: 16.99, originalPrice: 20.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Supplements', inStock: true, rating: 4.8, reviews: 289 },
    { id: 39, name: 'Probiotics 50B CFU', description: 'Gut health support', price: 24.99, originalPrice: 29.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Supplements', inStock: true, rating: 4.6, reviews: 198 },
    { id: 40, name: 'Iron Supplement', description: 'Anemia prevention', price: 8.99, originalPrice: 11.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Supplements', inStock: true, rating: 4.4, reviews: 145 },
    { id: 41, name: 'Zinc 50mg', description: 'Immune support mineral', price: 7.99, originalPrice: 9.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Supplements', inStock: true, rating: 4.5, reviews: 178 },
    { id: 42, name: 'Magnesium 400mg', description: 'Muscle and nerve function', price: 9.99, originalPrice: 12.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Supplements', inStock: true, rating: 4.6, reviews: 156 },
    { id: 43, name: 'Melatonin 5mg', description: 'Sleep aid supplement', price: 11.99, originalPrice: 14.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Sleep Aid', inStock: true, rating: 4.7, reviews: 234 },
    { id: 44, name: 'Valerian Root', description: 'Natural sleep support', price: 13.99, originalPrice: 16.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Sleep Aid', inStock: true, rating: 4.4, reviews: 123 },
    { id: 45, name: 'First Aid Kit', description: 'Complete emergency kit', price: 29.99, originalPrice: 35.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'First Aid', inStock: true, rating: 4.8, reviews: 267 },
    { id: 46, name: 'Bandages Assorted', description: 'Various size bandages', price: 5.99, originalPrice: 7.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'First Aid', inStock: true, rating: 4.5, reviews: 189 },
    { id: 47, name: 'Antiseptic Wipes', description: 'Wound cleaning wipes', price: 4.99, originalPrice: 6.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'First Aid', inStock: true, rating: 4.6, reviews: 145 },
    { id: 48, name: 'Digital Thermometer', description: 'Accurate temperature reading', price: 12.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Medical Devices', inStock: true, rating: 4.7, reviews: 198 },
    { id: 49, name: 'Blood Pressure Monitor', description: 'Home BP monitoring', price: 45.99, originalPrice: 55.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Medical Devices', inStock: true, rating: 4.8, reviews: 156 },
    { id: 50, name: 'Pulse Oximeter', description: 'Blood oxygen monitor', price: 29.99, originalPrice: 35.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Medical Devices', inStock: true, rating: 4.6, reviews: 134 },
    { id: 51, name: 'Glucose Monitor', description: 'Blood sugar testing', price: 35.99, originalPrice: 42.99, image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=200&h=200&fit=crop', category: 'Medical Devices', inStock: true, rating: 4.7, reviews: 178 },
    { id: 52, name: 'N95 Face Masks', description: 'Pack of 10 masks', price: 19.99, originalPrice: 24.99, image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop', category: 'Safety', inStock: true, rating: 4.5, reviews: 312 },
    { id: 53, name: 'Hand Sanitizer 500ml', description: 'Antibacterial gel', price: 6.99, originalPrice: 8.99, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop', category: 'Safety', inStock: true, rating: 4.6, reviews: 267 },
    { id: 54, name: 'Disposable Gloves', description: 'Box of 100 gloves', price: 12.99, originalPrice: 15.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop', category: 'Safety', inStock: true, rating: 4.4, reviews: 198 }
  ];

  private filteredProductsSubject = new BehaviorSubject<Product[]>(this.products);
  private selectedCategorySubject = new BehaviorSubject<string>('All');

  filteredProducts$ = this.filteredProductsSubject.asObservable();
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  getAllProducts(): Product[] {
    return this.products;
  }

  filterByCategory(category: string): void {
    this.selectedCategorySubject.next(category);
    if (category === 'All') {
      this.filteredProductsSubject.next(this.products);
    } else {
      const filtered = this.products.filter(p => p.category === category);
      this.filteredProductsSubject.next(filtered);
    }
  }

  searchProducts(query: string): void {
    const filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase())
    );
    this.filteredProductsSubject.next(filtered);
  }
}
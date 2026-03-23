import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private showLoginPopupSubject = new BehaviorSubject<boolean>(false);
  private showSignupPopupSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();
  showLoginPopup$ = this.showLoginPopupSubject.asObservable();
  showSignupPopup$ = this.showSignupPopupSubject.asObservable();

  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' }
  ];

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(user);
      this.closeAllPopups();
      return true;
    }
    return false;
  }

  signup(name: string, email: string, password: string): boolean {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
      password
    };
    this.users.push(newUser);
    this.isLoggedInSubject.next(true);
    this.currentUserSubject.next(newUser);
    this.closeAllPopups();
    return true;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
  }

  openLoginPopup(): void {
    this.showSignupPopupSubject.next(false);
    this.showLoginPopupSubject.next(true);
  }

  openSignupPopup(): void {
    this.showLoginPopupSubject.next(false);
    this.showSignupPopupSubject.next(true);
  }

  closeAllPopups(): void {
    this.showLoginPopupSubject.next(false);
    this.showSignupPopupSubject.next(false);
  }
}
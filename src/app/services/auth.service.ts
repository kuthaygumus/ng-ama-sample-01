import { Injectable } from '@angular/core';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: User | null = null;

  constructor() {
    // Local storage'dan kullanıcı bilgilerini al
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        this.currentUser = JSON.parse(storedUser);
      } catch (e) {
        // Parse hatası durumunda local storage temizle
        localStorage.removeItem('currentUser');
      }
    }
  }

  login(email: string, password: string): boolean {
    // Demo amaçlı basit bir login işlemi
    // Gerçek senaryoda bir API'ye istek atılır

    // Demo için sabit kullanıcı bilgileri
    // Farklı kullanıcı tipleri için store/auth/auth.effects.ts dosyasında da
    // email'e göre kontrol yapılmaktadır
    if (email && password) {
      const user: User = {
        id: '1',
        email: email,
        firstName: 'Kemal',
        lastName: 'Gümuş',
        token: 'demo-token-123456'
      };

      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

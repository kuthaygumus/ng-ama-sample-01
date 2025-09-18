import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import { selectIsAuthenticated } from './store/auth/auth.selectors';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ng-ama-04';
  isAuthenticated$: Observable<boolean>;
  canGoBack = false;
  navigationHistory: string[] = [];

  constructor(
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  ngOnInit(): void {
    // Yönlendirme geçmişini izle
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.navigationHistory.push(event.urlAfterRedirects);
      // Ana sayfa dışındaki tüm sayfalarda geri dönüş butonu göster
      this.canGoBack = this.navigationHistory.length > 1 && event.urlAfterRedirects !== '/dashboard';
    });
  }

  /**
   * Bir önceki sayfaya dönmek için kullanılır
   */
  goBack(): void {
    this.location.back();
    // Navigasyon geçmişini güncelle
    if (this.navigationHistory.length > 0) {
      this.navigationHistory.pop();
    }
    // Ana sayfaya döndüğümüzde geri butonu gizle
    if (this.navigationHistory.length <= 1 || this.navigationHistory[this.navigationHistory.length - 1] === '/dashboard') {
      this.canGoBack = false;
    }
  }

  // Logout işlemi artık ProfileContainer tarafından yönetilecek
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DetailedProfileData } from '../models/profile.model';

@Component({
  selector: 'app-profile-detail-presenter',
  templateUrl: './profile-detail-pres.template.html',
  styleUrls: ['./profile-detail-pres.style.scss']
})
export class ProfileDetailPresenterComponent {
  @Input() detailedData: DetailedProfileData | null = null;
  @Output() logoutClick = new EventEmitter<void>();
  @Output() updateClick = new EventEmitter<DetailedProfileData>();

  activeTab: 'personal' | 'payment' | 'preferences' | 'miles' = 'personal';

  constructor(private router: Router) {}

  onLogout(): void {
    this.logoutClick.emit();
  }

  setActiveTab(tab: 'personal' | 'payment' | 'preferences' | 'miles'): void {
    this.activeTab = tab;
  }

  getInitials(fullName: string | undefined): string {
    if (!fullName) return 'NA';
    const parts = fullName.split(' ');
    if (parts.length === 1) return fullName.substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  getStatusColor(): string {
    switch (this.detailedData?.status) {
      case 'Gold': return '#ffd700';
      case 'Silver': return '#c0c0c0';
      case 'Bronze': return '#cd7f32';
      default: return '#6b7280';
    }
  }

  getStatusIcon(): string {
    switch (this.detailedData?.status) {
      case 'Gold': return '👑';
      case 'Silver': return '🥈';
      case 'Bronze': return '🥉';
      default: return '✈️';
    }
  }

  formatMiles(miles: number | undefined): string {
    if (miles === undefined) return '0';
    return miles.toLocaleString();
  }

  // Kart numarasının son 4 hanesi hariç maskelenmiş gösterimi
  maskCardNumber(cardNumber: string): string {
    if (!cardNumber) return '';
    const last4 = cardNumber.slice(-4);
    return `•••• •••• •••• ${last4}`;
  }

  calculateProgressPercent(current: number | undefined, target: number | undefined): number {
    if (!current || !target) return 0;
    const percent = (current / target) * 100;
    return Math.min(percent, 100);
  }
}

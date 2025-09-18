import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProfileContainerData } from '../models/profile.model';

@Component({
  selector: 'app-profile-presenter',
  templateUrl: './profile-pres.template.html',
  styleUrls: ['./profile-pres.style.scss']
})
export class ProfilePresenterComponent {
  @Input() containerData: ProfileContainerData | null = null;
  @Output() logoutClick = new EventEmitter<void>();

  onLogout(): void {
    this.logoutClick.emit();
  }

  getInitials(fullName: string | undefined): string {
    if (!fullName) return 'NA';
    const parts = fullName.split(' ');
    if (parts.length === 1) return fullName.substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  getStatusColor(): string {
    switch (this.containerData?.status) {
      case 'Gold': return '#ffd700';
      case 'Silver': return '#c0c0c0';
      case 'Bronze': return '#cd7f32';
      default: return '#6b7280';
    }
  }

  getStatusIcon(): string {
    switch (this.containerData?.status) {
      case 'Gold': return '👑';
      case 'Silver': return '🥈';
      case 'Bronze': return '🥉';
      default: return '✈️';
    }
  }

  formatMiles(miles: number): string {
    return miles.toLocaleString();
  }
}

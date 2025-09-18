import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MileTransaction, MileSummary, MileMonthlyBreakdown, MileCategoryBreakdown } from '../models/mile-tracker.model';

@Component({
  selector: 'app-mile-tracker-presenter',
  templateUrl: './mile-tracker-presenter.component.html',
  styleUrls: ['./mile-tracker-presenter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MileTrackerPresenterComponent {
  @Input() transactions: MileTransaction[] | null = null;
  @Input() summary: MileSummary | null = null;
  @Input() monthlyBreakdown: MileMonthlyBreakdown[] | null = null;
  @Input() categoryBreakdown: MileCategoryBreakdown[] | null = null;
  @Input() loading: boolean | null = false;
  @Input() error: string | null = null;

  constructor() { }

  trackByTransactionId(index: number, transaction: MileTransaction): string {
    return transaction.id;
  }

  getEarnedTotal(): number {
    if (!this.transactions) return 0;
    return this.transactions
      .filter(t => t.type === 'earned')
      .reduce((acc, curr) => acc + curr.miles, 0);
  }

  getSpentTotal(): number {
    if (!this.transactions) return 0;
    return this.transactions
      .filter(t => t.type === 'spent')
      .reduce((acc, curr) => acc + curr.miles, 0);
  }

  getPendingTotal(): number {
    if (!this.transactions) return 0;
    return this.transactions
      .filter(t => t.status === 'pending')
      .reduce((acc, curr) => acc + curr.miles, 0);
  }
}

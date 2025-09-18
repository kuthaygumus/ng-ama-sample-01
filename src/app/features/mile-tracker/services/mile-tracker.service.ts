import { Injectable } from '@angular/core';
import { Observable, of, interval } from 'rxjs';
import { delay, map, startWith, switchMap } from 'rxjs/operators';
import {
  MileCategoryBreakdown,
  MileMonthlyBreakdown,
  MileSummary,
  MileTransaction,
  MileTransactionFilterParams
} from '../models/mile-tracker.model';

@Injectable()
export class MileTrackerService {
  constructor() {}

  getMileTransactions(filterParams?: MileTransactionFilterParams): Observable<MileTransaction[]> {
    // In a real application, this would be an HTTP call to your backend API
    return of(this.mockTransactions).pipe(
      delay(800),
      map(transactions => this.applyTransactionFilter(transactions, filterParams))
    );
  }

  getMileSummary(): Observable<MileSummary> {
    // Simulating API call with delay
    return of(this.mockSummary).pipe(delay(600));
  }

  getMonthlyBreakdown(): Observable<MileMonthlyBreakdown[]> {
    // Simulating API call with delay
    return of(this.mockMonthlyBreakdown).pipe(delay(900));
  }

  getCategoryBreakdown(): Observable<MileCategoryBreakdown[]> {
    // Simulating API call with delay
    return of(this.mockCategoryBreakdown).pipe(delay(700));
  }

  // Simulated real-time mile updates (for demonstrating RxJS interval and switchMap)
  getLiveUpdates(): Observable<MileSummary> {
    return interval(10000).pipe(
      startWith(0), // Start immediately with first emission
      switchMap(() => this.getMileSummary().pipe(
        map(summary => ({
          ...summary,
          // Simulating small random fluctuations in the total miles
          totalMiles: summary.totalMiles + Math.floor(Math.random() * 50)
        }))
      ))
    );
  }

  // Helper method to filter transactions
  private applyTransactionFilter(
    transactions: MileTransaction[],
    params?: MileTransactionFilterParams
  ): MileTransaction[] {
    if (!params) {
      return [...transactions].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return transactions.filter(tx => {
      // Filter by date range
      if (params.startDate) {
        const txDate = new Date(tx.date);
        if (txDate < params.startDate) return false;
      }

      if (params.endDate) {
        const txDate = new Date(tx.date);
        if (txDate > params.endDate) return false;
      }

      // Filter by transaction type
      if (params.types && params.types.length > 0) {
        if (!params.types.includes(tx.type)) return false;
      }

      // Filter by status
      if (params.status && params.status.length > 0) {
        if (!params.status.includes(tx.status)) return false;
      }

      return true;
    }).sort((a, b) => {
      const sortDirection = params.sortDirection === 'desc' ? -1 : 1;

      if (params.sortBy === 'miles') {
        return sortDirection * (a.miles - b.miles);
      }

      // Default sort by date
      return sortDirection * (new Date(a.date).getTime() - new Date(b.date).getTime());
    });
  }

  // Mock data
  private mockTransactions: MileTransaction[] = [
    {
      id: 'tx1',
      date: '2025-09-01',
      type: 'Flight',
      description: 'Istanbul to Paris',
      miles: 1250,
      status: 'Posted'
    },
    {
      id: 'tx2',
      date: '2025-09-10',
      type: 'Flight',
      description: 'Paris to New York',
      miles: 3700,
      status: 'Posted'
    },
    {
      id: 'tx3',
      date: '2025-09-18',
      type: 'Flight',
      description: 'New York to Istanbul',
      miles: 4500,
      status: 'Pending'
    },
    {
      id: 'tx4',
      date: '2025-08-20',
      type: 'Redemption',
      description: 'Business Class Upgrade',
      miles: -25000,
      status: 'Posted'
    },
    {
      id: 'tx5',
      date: '2025-08-15',
      type: 'Partner',
      description: 'Hotel Stay - Hilton Istanbul',
      miles: 2500,
      status: 'Posted'
    },
    {
      id: 'tx6',
      date: '2025-07-30',
      type: 'Bonus',
      description: 'Summer Promotion',
      miles: 5000,
      status: 'Posted',
      expirationDate: '2026-07-30'
    },
    {
      id: 'tx7',
      date: '2025-07-10',
      type: 'Transfer',
      description: 'Transfer from Credit Card',
      miles: 10000,
      status: 'Posted',
      expirationDate: '2026-07-10'
    },
    {
      id: 'tx8',
      date: '2025-06-15',
      type: 'Flight',
      description: 'Istanbul to London',
      miles: 1750,
      status: 'Posted'
    }
  ];

  private mockSummary: MileSummary = {
    totalMiles: 53700,
    availableMiles: 28700,
    expiringSoonMiles: 5000,
    expiringSoonDate: '2025-12-31',
    currentYearMiles: 28700,
    previousYearMiles: 25000,
    milesUntilNextStatus: 21300,
    nextStatus: 'Gold',
    statusProgress: 0.65
  };

  private mockMonthlyBreakdown: MileMonthlyBreakdown[] = [
    { month: 'January', year: 2025, earnedMiles: 3200, spentMiles: 0, netMiles: 3200 },
    { month: 'February', year: 2025, earnedMiles: 4500, spentMiles: 2000, netMiles: 2500 },
    { month: 'March', year: 2025, earnedMiles: 2800, spentMiles: 0, netMiles: 2800 },
    { month: 'April', year: 2025, earnedMiles: 1500, spentMiles: 0, netMiles: 1500 },
    { month: 'May', year: 2025, earnedMiles: 3700, spentMiles: 0, netMiles: 3700 },
    { month: 'June', year: 2025, earnedMiles: 5750, spentMiles: 10000, netMiles: -4250 },
    { month: 'July', year: 2025, earnedMiles: 15000, spentMiles: 0, netMiles: 15000 },
    { month: 'August', year: 2025, earnedMiles: 2500, spentMiles: 25000, netMiles: -22500 },
    { month: 'September', year: 2025, earnedMiles: 9450, spentMiles: 0, netMiles: 9450 }
  ];

  private mockCategoryBreakdown: MileCategoryBreakdown[] = [
    { category: 'Flight', miles: 40000, percentage: 53.3 },
    { category: 'Partner', miles: 12500, percentage: 16.7 },
    { category: 'Bonus', miles: 15000, percentage: 20.0 },
    { category: 'Transfer', miles: 7500, percentage: 10.0 }
  ];
}

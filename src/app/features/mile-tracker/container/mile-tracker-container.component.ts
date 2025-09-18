import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MileTransaction, MileSummary, MileMonthlyBreakdown, MileCategoryBreakdown } from '../models/mile-tracker.model';
import * as MileTrackerActions from '../store/mile-tracker.actions';
import * as MileTrackerSelectors from '../store/mile-tracker.selectors';

@Component({
  selector: 'app-mile-tracker-container',
  template: `
    <app-mile-tracker-presenter
      [transactions]="transactions$ | async"
      [summary]="summary$ | async"
      [monthlyBreakdown]="monthlyBreakdown$ | async"
      [categoryBreakdown]="categoryBreakdown$ | async"
      [loading]="loading$ | async"
      [error]="error$ | async">
    </app-mile-tracker-presenter>
  `
})
export class MileTrackerContainerComponent implements OnInit {
  transactions$!: Observable<MileTransaction[]>;
  summary$!: Observable<MileSummary>;
  monthlyBreakdown$!: Observable<MileMonthlyBreakdown[]>;
  categoryBreakdown$!: Observable<MileCategoryBreakdown[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initializeData();
    this.initializeSelectors();
  }

  private initializeData(): void {
    this.store.dispatch(MileTrackerActions.loadMileTransactions({ filter: undefined }));
    this.store.dispatch(MileTrackerActions.loadMileSummary());
    this.store.dispatch(MileTrackerActions.loadMonthlyBreakdown());
    this.store.dispatch(MileTrackerActions.loadCategoryBreakdown());
  }

  private initializeSelectors(): void {
    this.transactions$ = this.store.select(MileTrackerSelectors.selectMileTransactions);
    this.summary$ = this.store.select(MileTrackerSelectors.selectMileSummary);
    this.monthlyBreakdown$ = this.store.select(MileTrackerSelectors.selectMonthlyBreakdown);
    this.categoryBreakdown$ = this.store.select(MileTrackerSelectors.selectCategoryBreakdown);
    this.loading$ = this.store.select(MileTrackerSelectors.selectLoading);
    this.error$ = this.store.select(MileTrackerSelectors.selectError);
  }
}

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MileTrackerState } from '../models/mile-tracker.model';

export const selectMileTrackerState = createFeatureSelector<MileTrackerState>('mileTracker');

export const selectMileTransactions = createSelector(
  selectMileTrackerState,
  state => state.transactions
);

export const selectMileSummary = createSelector(
  selectMileTrackerState,
  state => state.summary
);

export const selectMonthlyBreakdown = createSelector(
  selectMileTrackerState,
  state => state.monthlyBreakdown
);

export const selectCategoryBreakdown = createSelector(
  selectMileTrackerState,
  state => state.categoryBreakdown
);

export const selectLoading = createSelector(
  selectMileTrackerState,
  state => state.loading
);

export const selectError = createSelector(
  selectMileTrackerState,
  state => state.error
);

export const selectTotalMiles = createSelector(
  selectMileSummary,
  summary => summary.totalMiles
);

export const selectAvailableMiles = createSelector(
  selectMileSummary,
  summary => summary.availableMiles
);

export const selectStatusProgress = createSelector(
  selectMileSummary,
  summary => summary.statusProgress
);

export const selectExpiringSoonMiles = createSelector(
  selectMileSummary,
  summary => ({
    miles: summary.expiringSoonMiles,
    date: summary.expiringSoonDate
  })
);

export const selectMileEarningTrend = createSelector(
  selectMonthlyBreakdown,
  monthlyData => monthlyData.map(item => ({
    month: item.month,
    miles: item.earnedMiles
  }))
);

export const selectMileSpendingTrend = createSelector(
  selectMonthlyBreakdown,
  monthlyData => monthlyData.map(item => ({
    month: item.month,
    miles: item.spentMiles
  }))
);

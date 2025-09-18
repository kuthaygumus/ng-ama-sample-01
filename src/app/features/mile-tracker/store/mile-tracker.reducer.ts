import { createReducer, on } from '@ngrx/store';
import { MileTrackerState } from '../models/mile-tracker.model';
import * as MileTrackerActions from './mile-tracker.actions';

export const initialState: MileTrackerState = {
  transactions: [],
  summary: {
    totalMiles: 0,
    availableMiles: 0,
    expiringSoonMiles: 0,
    expiringSoonDate: null,
    currentYearMiles: 0,
    previousYearMiles: 0,
    milesUntilNextStatus: 0,
    nextStatus: '',
    statusProgress: 0
  },
  monthlyBreakdown: [],
  categoryBreakdown: [],
  loading: false,
  error: null
};

export const mileTrackerReducer = createReducer(
  initialState,

  // Load mile transactions
  on(MileTrackerActions.loadMileTransactions, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(MileTrackerActions.loadMileTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false
  })),

  on(MileTrackerActions.loadMileTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load mile summary
  on(MileTrackerActions.loadMileSummary, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(MileTrackerActions.loadMileSummarySuccess, (state, { summary }) => ({
    ...state,
    summary,
    loading: false
  })),

  on(MileTrackerActions.loadMileSummaryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load monthly breakdown
  on(MileTrackerActions.loadMonthlyBreakdown, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(MileTrackerActions.loadMonthlyBreakdownSuccess, (state, { monthlyBreakdown }) => ({
    ...state,
    monthlyBreakdown,
    loading: false
  })),

  on(MileTrackerActions.loadMonthlyBreakdownFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Load category breakdown
  on(MileTrackerActions.loadCategoryBreakdown, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(MileTrackerActions.loadCategoryBreakdownSuccess, (state, { categoryBreakdown }) => ({
    ...state,
    categoryBreakdown,
    loading: false
  })),

  on(MileTrackerActions.loadCategoryBreakdownFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update mile summary (for real-time updates)
  on(MileTrackerActions.updateMileSummary, (state, { summary }) => ({
    ...state,
    summary
  }))
);

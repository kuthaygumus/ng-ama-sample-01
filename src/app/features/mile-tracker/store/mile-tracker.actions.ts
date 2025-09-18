import { createAction, props } from '@ngrx/store';
import { MileCategoryBreakdown, MileMonthlyBreakdown, MileSummary, MileTransaction, MileTransactionFilterParams } from '../models/mile-tracker.model';

// Load mile transactions
export const loadMileTransactions = createAction(
  '[Mile Tracker] Load Mile Transactions',
  props<{ filter?: MileTransactionFilterParams }>()
);

export const loadMileTransactionsSuccess = createAction(
  '[Mile Tracker] Load Mile Transactions Success',
  props<{ transactions: MileTransaction[] }>()
);

export const loadMileTransactionsFailure = createAction(
  '[Mile Tracker] Load Mile Transactions Failure',
  props<{ error: string }>()
);

// Load mile summary
export const loadMileSummary = createAction(
  '[Mile Tracker] Load Mile Summary'
);

export const loadMileSummarySuccess = createAction(
  '[Mile Tracker] Load Mile Summary Success',
  props<{ summary: MileSummary }>()
);

export const loadMileSummaryFailure = createAction(
  '[Mile Tracker] Load Mile Summary Failure',
  props<{ error: string }>()
);

// Load monthly breakdown
export const loadMonthlyBreakdown = createAction(
  '[Mile Tracker] Load Monthly Breakdown'
);

export const loadMonthlyBreakdownSuccess = createAction(
  '[Mile Tracker] Load Monthly Breakdown Success',
  props<{ monthlyBreakdown: MileMonthlyBreakdown[] }>()
);

export const loadMonthlyBreakdownFailure = createAction(
  '[Mile Tracker] Load Monthly Breakdown Failure',
  props<{ error: string }>()
);

// Load category breakdown
export const loadCategoryBreakdown = createAction(
  '[Mile Tracker] Load Category Breakdown'
);

export const loadCategoryBreakdownSuccess = createAction(
  '[Mile Tracker] Load Category Breakdown Success',
  props<{ categoryBreakdown: MileCategoryBreakdown[] }>()
);

export const loadCategoryBreakdownFailure = createAction(
  '[Mile Tracker] Load Category Breakdown Failure',
  props<{ error: string }>()
);

// Update mile summary (for real-time updates)
export const updateMileSummary = createAction(
  '[Mile Tracker] Update Mile Summary',
  props<{ summary: MileSummary }>()
);

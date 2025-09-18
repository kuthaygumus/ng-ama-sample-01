import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { MileTrackerService } from '../services/mile-tracker.service';
import * as MileTrackerActions from './mile-tracker.actions';

@Injectable()
export class MileTrackerEffects {
  constructor(
    private actions$: Actions,
    private mileTrackerService: MileTrackerService
  ) {}

  loadMileTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MileTrackerActions.loadMileTransactions),
      switchMap(({ filter }) =>
        this.mileTrackerService.getMileTransactions(filter).pipe(
          map(transactions =>
            MileTrackerActions.loadMileTransactionsSuccess({ transactions })
          ),
          catchError(error =>
            of(MileTrackerActions.loadMileTransactionsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadMileSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MileTrackerActions.loadMileSummary),
      mergeMap(() =>
        this.mileTrackerService.getMileSummary().pipe(
          map(summary => MileTrackerActions.loadMileSummarySuccess({ summary })),
          catchError(error =>
            of(MileTrackerActions.loadMileSummaryFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadMonthlyBreakdown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MileTrackerActions.loadMonthlyBreakdown),
      mergeMap(() =>
        this.mileTrackerService.getMonthlyBreakdown().pipe(
          map(monthlyBreakdown =>
            MileTrackerActions.loadMonthlyBreakdownSuccess({ monthlyBreakdown })
          ),
          catchError(error =>
            of(MileTrackerActions.loadMonthlyBreakdownFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadCategoryBreakdown$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MileTrackerActions.loadCategoryBreakdown),
      mergeMap(() =>
        this.mileTrackerService.getCategoryBreakdown().pipe(
          map(categoryBreakdown =>
            MileTrackerActions.loadCategoryBreakdownSuccess({ categoryBreakdown })
          ),
          catchError(error =>
            of(MileTrackerActions.loadCategoryBreakdownFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

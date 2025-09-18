import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { FlightHistoryService } from '../services/flight-history.service';
import * as FlightHistoryActions from './flight-history.actions';

@Injectable()
export class FlightHistoryEffects {
  constructor(
    private actions$: Actions,
    private flightHistoryService: FlightHistoryService
  ) {}

  loadFlightHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightHistoryActions.loadFlightHistory),
      mergeMap(() =>
        this.flightHistoryService.getFlightHistory().pipe(
          map(flights => FlightHistoryActions.loadFlightHistorySuccess({ flights })),
          catchError(error =>
            of(FlightHistoryActions.loadFlightHistoryFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadFilteredFlights$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightHistoryActions.loadFilteredFlights),
      switchMap(({ filter }) =>
        this.flightHistoryService.getFilteredFlights(filter).pipe(
          map(flights => FlightHistoryActions.loadFilteredFlightsSuccess({ flights })),
          catchError(error =>
            of(FlightHistoryActions.loadFilteredFlightsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Listen to applyFilter action as well
  applyFilter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FlightHistoryActions.applyFilter),
      switchMap(({ filter }) =>
        this.flightHistoryService.getFilteredFlights(filter).pipe(
          map(flights => FlightHistoryActions.loadFilteredFlightsSuccess({ flights })),
          catchError(error =>
            of(FlightHistoryActions.loadFilteredFlightsFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

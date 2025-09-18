import { createAction, props } from '@ngrx/store';
import { Flight, FlightHistoryFilter } from '../models/flight-history.model';

// Load flight history
export const loadFlightHistory = createAction(
  '[Flight History] Load Flight History'
);

export const loadFlightHistorySuccess = createAction(
  '[Flight History] Load Flight History Success',
  props<{ flights: Flight[] }>()
);

export const loadFlightHistoryFailure = createAction(
  '[Flight History] Load Flight History Failure',
  props<{ error: string }>()
);

// Apply filters
export const applyFilter = createAction(
  '[Flight History] Apply Filter',
  props<{ filter: FlightHistoryFilter }>()
);

export const clearFilters = createAction(
  '[Flight History] Clear Filters'
);

// Get filtered flights
export const loadFilteredFlights = createAction(
  '[Flight History] Load Filtered Flights',
  props<{ filter: FlightHistoryFilter }>()
);

export const loadFilteredFlightsSuccess = createAction(
  '[Flight History] Load Filtered Flights Success',
  props<{ flights: Flight[] }>()
);

export const loadFilteredFlightsFailure = createAction(
  '[Flight History] Load Filtered Flights Failure',
  props<{ error: string }>()
);

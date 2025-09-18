import { createReducer, on } from '@ngrx/store';
import { FlightHistoryState } from '../models/flight-history.model';
import * as FlightHistoryActions from './flight-history.actions';

export const initialState: FlightHistoryState = {
  flights: [],
  filteredFlights: [],
  filter: {},
  loading: false,
  error: null
};

export const flightHistoryReducer = createReducer(
  initialState,

  // Load flight history
  on(FlightHistoryActions.loadFlightHistory, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FlightHistoryActions.loadFlightHistorySuccess, (state, { flights }) => ({
    ...state,
    flights,
    filteredFlights: flights,
    loading: false
  })),

  on(FlightHistoryActions.loadFlightHistoryFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Apply filter
  on(FlightHistoryActions.applyFilter, (state, { filter }) => ({
    ...state,
    filter,
    loading: true
  })),

  on(FlightHistoryActions.clearFilters, state => ({
    ...state,
    filter: {},
    filteredFlights: state.flights
  })),

  // Load filtered flights
  on(FlightHistoryActions.loadFilteredFlights, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(FlightHistoryActions.loadFilteredFlightsSuccess, (state, { flights }) => ({
    ...state,
    filteredFlights: flights,
    loading: false
  })),

  on(FlightHistoryActions.loadFilteredFlightsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

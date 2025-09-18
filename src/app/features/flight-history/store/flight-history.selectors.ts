import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FlightHistoryState } from '../models/flight-history.model';

export const selectFlightHistoryState = createFeatureSelector<FlightHistoryState>('flightHistory');

export const selectAllFlights = createSelector(
  selectFlightHistoryState,
  state => state.flights
);

export const selectFilteredFlights = createSelector(
  selectFlightHistoryState,
  state => state.filteredFlights
);

export const selectCurrentFilter = createSelector(
  selectFlightHistoryState,
  state => state.filter
);

export const selectLoading = createSelector(
  selectFlightHistoryState,
  state => state.loading
);

export const selectError = createSelector(
  selectFlightHistoryState,
  state => state.error
);

export const selectFlightDestinations = createSelector(
  selectAllFlights,
  flights => {
    const destinations = new Set(flights.map(flight => flight.destination));
    return Array.from(destinations).sort();
  }
);

export const selectFlightOrigins = createSelector(
  selectAllFlights,
  flights => {
    const origins = new Set(flights.map(flight => flight.origin));
    return Array.from(origins).sort();
  }
);

export const selectFlightStatuses = createSelector(
  selectAllFlights,
  flights => {
    const statuses = new Set(flights.map(flight => flight.status));
    return Array.from(statuses).sort();
  }
);

export const selectTotalMiles = createSelector(
  selectAllFlights,
  flights => flights.reduce((total, flight) => total + flight.miles, 0)
);

export const selectCompletedFlights = createSelector(
  selectAllFlights,
  flights => flights.filter(flight => flight.status === 'Completed')
);

export const selectUpcomingFlights = createSelector(
  selectAllFlights,
  flights => flights.filter(flight => flight.status === 'Scheduled')
);

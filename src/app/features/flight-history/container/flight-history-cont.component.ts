import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Flight, FlightHistoryFilter, FlightFilterEvent } from '../models/flight-history.model';
import * as FlightHistoryActions from '../store/flight-history.actions';
import * as FlightHistorySelectors from '../store/flight-history.selectors';

@Component({
  selector: 'app-flight-history-container',
  template: `
    <app-flight-history-presenter
      [flights]="(filteredFlights$ | async) || []"
      [loading]="(loading$ | async) || false"
      [error]="error$ | async"
      [origins]="(origins$ | async) || []"
      [destinations]="(destinations$ | async) || []"
      (filterChange)="onFilterChange($event)">
    </app-flight-history-presenter>
  `
})
export class FlightHistoryContainerComponent implements OnInit {
  filteredFlights$!: Observable<Flight[]>;
  origins$!: Observable<string[]>;
  destinations$!: Observable<string[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.initializeSelectors();
    // Load initial flight data
    this.store.dispatch(FlightHistoryActions.loadFlightHistory());
  }

  onFilterChange(event: FlightFilterEvent): void {
    this.store.dispatch(FlightHistoryActions.applyFilter({ filter: event.filter }));
    // We don't need to dispatch loadFilteredFlights here anymore as we're handling it in the effects
  }

  private initializeSelectors(): void {
    this.filteredFlights$ = this.store.select(FlightHistorySelectors.selectFilteredFlights);
    this.origins$ = this.store.select(FlightHistorySelectors.selectFlightOrigins);
    this.destinations$ = this.store.select(FlightHistorySelectors.selectFlightDestinations);
    this.loading$ = this.store.select(FlightHistorySelectors.selectLoading);
    this.error$ = this.store.select(FlightHistorySelectors.selectError);
  }
}

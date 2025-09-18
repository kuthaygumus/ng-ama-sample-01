import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Flight, FlightFilterEvent, FlightHistoryFilter, FlightStatus, SortDirection, SortOption } from '../models/flight-history.model';

@Component({
  selector: 'app-flight-history-presenter',
  templateUrl: './flight-history-pres.component.html',
  styleUrls: ['./flight-history-pres.component.scss']
})
export class FlightHistoryPresenterComponent implements OnInit {
  @Input() flights: Flight[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
  @Input() origins: string[] = [];
  @Input() destinations: string[] = [];

  @Output() filterChange = new EventEmitter<FlightFilterEvent>();

  filterForm!: FormGroup;
  displayedColumns: string[] = ['flightNumber', 'date', 'origin', 'destination', 'status', 'miles', 'price'];

  // Available options for dropdowns
  availableOrigins: string[] = [];
  availableDestinations: string[] = [];
  availableStatuses: FlightStatus[] = [];

  // Default values
  statuses: FlightStatus[] = ['Completed', 'Scheduled', 'Delayed', 'Cancelled', 'In Progress'];
  sortOptions: { value: SortOption, label: string }[] = [
    { value: 'date', label: 'Date' },
    { value: 'origin', label: 'Origin' },
    { value: 'destination', label: 'Destination' },
    { value: 'duration', label: 'Duration' },
    { value: 'miles', label: 'Miles' }
  ];
  sortDirections: { value: SortDirection, label: string }[] = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadAvailableOptions();
  }

  loadAvailableOptions(): void {
    // Use the Input properties if available
    this.availableOrigins = this.origins.length > 0 ? this.origins : [];
    this.availableDestinations = this.destinations.length > 0 ? this.destinations : [];
    this.availableStatuses = this.statuses;
  }

  initializeForm(): void {
    this.filterForm = this.fb.group({
      startDate: [null],
      endDate: [null],
      origin: [''],
      destination: [''],
      status: [''],
      sortBy: ['date'],
      sortDirection: ['desc']
    });

    // Subscribe to form changes and emit filter events with debounce
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300) // Wait for 300ms after the last change before emitting
      )
      .subscribe(values => {
        this.emitFilterChange(values);
      });
  }

  clearFilters(): void {
    this.filterForm.reset({
      startDate: null,
      endDate: null,
      origin: '',
      destination: '',
      status: '',
      sortBy: 'date',
      sortDirection: 'desc'
    });
  }

  emitFilterChange(values: any): void {
    // Create filter object only with non-empty values
    const filter: FlightHistoryFilter = {};

    if (values.startDate) {
      // Make sure startDate is a Date object
      if (!(values.startDate instanceof Date)) {
        if (typeof values.startDate === 'string') {
          filter.startDate = new Date(values.startDate);
        } else {
          filter.startDate = values.startDate;
        }
      } else {
        filter.startDate = values.startDate;
      }
    }

    if (values.endDate) {
      // Make sure endDate is a Date object
      if (!(values.endDate instanceof Date)) {
        if (typeof values.endDate === 'string') {
          filter.endDate = new Date(values.endDate);
        } else {
          filter.endDate = values.endDate;
        }
      } else {
        filter.endDate = values.endDate;
      }
    }

    if (values.origin) filter.origin = values.origin;
    if (values.destination) filter.destination = values.destination;
    if (values.status) filter.status = values.status as FlightStatus;
    if (values.sortBy) filter.sortBy = values.sortBy as SortOption;
    if (values.sortDirection) filter.sortDirection = values.sortDirection as SortDirection;

    this.filterChange.emit({ filter });
  }
}

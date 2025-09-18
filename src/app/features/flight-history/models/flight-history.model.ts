export interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  durationMinutes: number;
  aircraft: string;
  status: FlightStatus;
  miles: number;
  price: number;
}

export interface FlightHistoryFilter {
  startDate?: Date;
  endDate?: Date;
  origin?: string;
  destination?: string;
  status?: FlightStatus;
  sortBy?: SortOption;
  sortDirection?: SortDirection;
}

export type FlightStatus = 'Completed' | 'Scheduled' | 'Delayed' | 'Cancelled' | 'In Progress';
export type SortOption = 'date' | 'origin' | 'destination' | 'duration' | 'miles';
export type SortDirection = 'asc' | 'desc';

export interface FlightHistoryState {
  flights: Flight[];
  filteredFlights: Flight[];
  filter: FlightHistoryFilter;
  loading: boolean;
  error: string | null;
}

export interface FlightHistoryContainerData {
  flights: Flight[];
  loading: boolean;
  error: string | null;
  filter: FlightHistoryFilter;
}

export interface FlightFilterEvent {
  filter: FlightHistoryFilter;
}

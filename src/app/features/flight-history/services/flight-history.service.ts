import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Flight, FlightHistoryFilter, FlightStatus } from '../models/flight-history.model';

@Injectable()
export class FlightHistoryService {
  constructor() {}

  getFlightHistory(): Observable<Flight[]> {
    // In a real application, this would be an HTTP call to your backend API
    return of(this.mockFlightData).pipe(delay(800));
  }

  getFilteredFlights(filter: FlightHistoryFilter): Observable<Flight[]> {
    // Simulating server-side filtering
    return of(this.applyFilter(this.mockFlightData, filter)).pipe(delay(500));
  }

  private applyFilter(flights: Flight[], filter: FlightHistoryFilter): Flight[] {
    // Make a copy of the array to avoid modifying the original
    let filteredFlights = [...flights];

    // Apply filters one by one
    if (filter.startDate) {
      const startDate = new Date(filter.startDate);
      filteredFlights = filteredFlights.filter(flight => {
        const flightDate = new Date(flight.departureDate);
        return flightDate >= startDate;
      });
    }

    if (filter.endDate) {
      const endDate = new Date(filter.endDate);
      // Set the end date to the end of day
      endDate.setHours(23, 59, 59, 999);
      filteredFlights = filteredFlights.filter(flight => {
        const flightDate = new Date(flight.departureDate);
        return flightDate <= endDate;
      });
    }

    // Filter by origin
    if (filter.origin && filter.origin.trim() !== '') {
      filteredFlights = filteredFlights.filter(flight =>
        flight.origin === filter.origin
      );
    }

    // Filter by destination
    if (filter.destination && filter.destination.trim() !== '') {
      filteredFlights = filteredFlights.filter(flight =>
        flight.destination === filter.destination
      );
    }

    // Filter by status
    if (filter.status && filter.status.trim() !== '') {
      filteredFlights = filteredFlights.filter(flight =>
        flight.status === filter.status
      );
    }

    // Apply sorting
    return filteredFlights.sort((a, b) => {
      const sortDirection = filter.sortDirection === 'desc' ? -1 : 1;

      switch (filter.sortBy) {
        case 'date':
          return sortDirection * (new Date(a.departureDate).getTime() - new Date(b.departureDate).getTime());
        case 'origin':
          return sortDirection * a.origin.localeCompare(b.origin);
        case 'destination':
          return sortDirection * a.destination.localeCompare(b.destination);
        case 'duration':
          return sortDirection * (a.durationMinutes - b.durationMinutes);
        case 'miles':
          return sortDirection * (a.miles - b.miles);
        default:
          return new Date(b.departureDate).getTime() - new Date(a.departureDate).getTime();
      }
    });
  }

  // Mock data for demonstration
  private mockFlightData: Flight[] = [
    {
      id: 'f1',
      flightNumber: 'AM456',
      origin: 'Istanbul',
      destination: 'Paris',
      departureDate: '2025-09-01',
      departureTime: '08:30',
      arrivalDate: '2025-09-01',
      arrivalTime: '11:15',
      durationMinutes: 165,
      aircraft: 'Airbus A320',
      status: 'Completed',
      miles: 1250,
      price: 450
    },
    {
      id: 'f2',
      flightNumber: 'AM789',
      origin: 'Paris',
      destination: 'New York',
      departureDate: '2025-09-10',
      departureTime: '13:45',
      arrivalDate: '2025-09-10',
      arrivalTime: '16:30',
      durationMinutes: 525,
      aircraft: 'Boeing 787',
      status: 'Completed',
      miles: 3700,
      price: 750
    },
    {
      id: 'f3',
      flightNumber: 'AM234',
      origin: 'New York',
      destination: 'Istanbul',
      departureDate: '2025-09-18',
      departureTime: '22:15',
      arrivalDate: '2025-09-19',
      arrivalTime: '16:45',
      durationMinutes: 630,
      aircraft: 'Airbus A330',
      status: 'In Progress',
      miles: 4500,
      price: 830
    },
    {
      id: 'f4',
      flightNumber: 'AM512',
      origin: 'Istanbul',
      destination: 'London',
      departureDate: '2025-09-25',
      departureTime: '07:20',
      arrivalDate: '2025-09-25',
      arrivalTime: '09:30',
      durationMinutes: 250,
      aircraft: 'Boeing 737',
      status: 'Scheduled',
      miles: 1750,
      price: 380
    },
    {
      id: 'f5',
      flightNumber: 'AM678',
      origin: 'Rome',
      destination: 'Istanbul',
      departureDate: '2025-08-15',
      departureTime: '15:40',
      arrivalDate: '2025-08-15',
      arrivalTime: '19:20',
      durationMinutes: 220,
      aircraft: 'Airbus A319',
      status: 'Completed',
      miles: 1380,
      price: 320
    },
    {
      id: 'f6',
      flightNumber: 'AM301',
      origin: 'Istanbul',
      destination: 'Dubai',
      departureDate: '2025-08-05',
      departureTime: '01:15',
      arrivalDate: '2025-08-05',
      arrivalTime: '06:45',
      durationMinutes: 330,
      aircraft: 'Boeing 777',
      status: 'Completed',
      miles: 2600,
      price: 590
    },
    {
      id: 'f7',
      flightNumber: 'AM889',
      origin: 'Madrid',
      destination: 'Istanbul',
      departureDate: '2025-10-12',
      departureTime: '09:50',
      arrivalDate: '2025-10-12',
      arrivalTime: '14:35',
      durationMinutes: 285,
      aircraft: 'Airbus A321',
      status: 'Scheduled',
      miles: 1820,
      price: 410
    }
  ] as Flight[];
}

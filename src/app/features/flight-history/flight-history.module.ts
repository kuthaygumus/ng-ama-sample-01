import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Store imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

// Components
import { FlightHistoryContainerComponent } from './container/flight-history-cont.component';
import { FlightHistoryPresenterComponent } from './presenter/flight-history-pres.component';

// Store
import { FlightHistoryEffects } from './store/flight-history.effects';
import { flightHistoryReducer } from './store/flight-history.reducer';

// Services
import { FlightHistoryService } from './services/flight-history.service';

const routes: Routes = [
  { path: '', component: FlightHistoryContainerComponent }
];

@NgModule({
  declarations: [
    FlightHistoryContainerComponent,
    FlightHistoryPresenterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('flightHistory', flightHistoryReducer),
    EffectsModule.forFeature([FlightHistoryEffects]),
    // Angular Material
    MatCardModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  providers: [
    FlightHistoryService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlightHistoryModule { }

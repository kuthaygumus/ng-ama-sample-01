import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Store imports
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { mileTrackerReducer } from './store/mile-tracker.reducer';
import { MileTrackerEffects } from './store/mile-tracker.effects';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { CdkTableModule } from '@angular/cdk/table';

// Components
import { MileTrackerContainerComponent } from './container/mile-tracker-container.component';
import { MileTrackerPresenterComponent } from './presenter/mile-tracker-presenter.component';

// Services
import { MileTrackerService } from './services/mile-tracker.service';

const routes: Routes = [
  { path: '', component: MileTrackerContainerComponent }
];

@NgModule({
  declarations: [
    MileTrackerContainerComponent,
    MileTrackerPresenterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('mileTracker', mileTrackerReducer),
    EffectsModule.forFeature([MileTrackerEffects]),
    // Angular Material
    MatCardModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    CdkTableModule
  ],
  providers: [
    MileTrackerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MileTrackerModule { }

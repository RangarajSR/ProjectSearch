import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchInputComponent } from './search-input.component';
import { DpDatePickerModule } from 'ng2-date-picker';
import { IonRangeSliderModule } from 'ng2-ion-range-slider';

@NgModule({
  imports: [
    CommonModule,
    DpDatePickerModule,
    IonRangeSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SearchInputComponent],
  exports: [ SearchInputComponent ]
})
export class SearchInputModule { }


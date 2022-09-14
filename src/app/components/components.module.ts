import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonutComponent } from './donut/donut.component';

@NgModule({
  declarations: [IncrementadorComponent, DonutComponent],
  exports: [IncrementadorComponent, DonutComponent],
  imports: [CommonModule, ReactiveFormsModule, NgChartsModule],
})
export class ComponentsModule {}

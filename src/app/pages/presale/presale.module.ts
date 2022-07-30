import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresaleRoutingModule } from './presale-routing.module';
import { PresaleComponent } from './presale.component';


@NgModule({
  declarations: [
    PresaleComponent
  ],
  imports: [
    CommonModule,
    PresaleRoutingModule
  ]
})
export class PresaleModule { }

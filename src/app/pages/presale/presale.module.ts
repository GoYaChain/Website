import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PresaleRoutingModule } from './presale-routing.module';
import { PresaleComponent } from './presale.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from 'ngx-clipboard';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    PresaleComponent
  ],
  imports: [
    CommonModule,
    PresaleRoutingModule,


    MatTooltipModule,
    ToastrModule.forRoot(),

    ClipboardModule,
  ]
})
export class PresaleModule { }

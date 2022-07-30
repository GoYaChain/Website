import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresaleComponent } from './presale.component';

const routes: Routes = [{ path: '', component: PresaleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresaleRoutingModule { }

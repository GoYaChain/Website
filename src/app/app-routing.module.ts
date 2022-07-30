import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LitepaperComponent } from './litepaper/litepaper.component';
import { MainComponent } from './main/main.component';
import { PageTestComponent } from './page-test/page-test.component';
import { ReferralComponent } from './pages/referral/referral.component';



const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: "test",
    component: PageTestComponent,
  },
  {
    path: "referral",
    component: ReferralComponent,
  },
  {
    path: 'litepaper',
    component: LitepaperComponent
  },
  { path: 'presale', loadChildren: () => import('./pages/presale/presale.module').then(m => m.PresaleModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { NavComponent } from './nav/nav.component';
import { PageTestComponent } from './page-test/page-test.component';
import { LitepaperComponent } from './litepaper/litepaper.component';
import { MainComponent } from './main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { TeximateModule } from 'ngx-teximate';
import 'hammerjs';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClipboardModule } from 'ngx-clipboard';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { APPCONFIG, APP_CONFIG } from './config/config';

import { Web3HelperPro } from './Helper/web3_helper_pro';
import { HashStr } from './Service/hash-str.service';

import { HttpClientModule } from '@angular/common/http';
import { TimelineComponent } from './main/timeline/timeline.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from './main/chart/chart.component';
import { HttpHelper } from './Helper/http-helper';
import { ReferralComponent } from './pages/referral/referral.component';
import { SharedModule } from './shared/shared.module';
import { OpsComponent } from './pages/ops/ops.component';
@NgModule({
  declarations: [
    AppComponent,
    DropdownMenuComponent,
    NavComponent,
    PageTestComponent,
    LitepaperComponent,
    MainComponent,
    ReferralComponent,
    TimelineComponent,
    ChartComponent,
    OpsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    TeximateModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatButtonModule,
    ClipboardModule,
    NgbModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),

    FormsModule,
    SharedModule

  ],
  providers: [{ provide: APP_CONFIG, useValue: APPCONFIG, },
    HttpHelper,
    Web3HelperPro,
    HashStr],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

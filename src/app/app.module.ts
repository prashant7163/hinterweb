import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppModuleHttpService } from './services/app-module-http.service';
import { HttpClientModule } from '@angular/common/http';
import { SupportComponent } from './components/support/support.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UseragreementComponent } from './components/useragreement/useragreement.component';
import { HomecomponentComponent } from './components/homecomponent/homecomponent.component';
import { EntryDetailComponent } from './components/entrydetail/entry-detail.component';
import { MessageService } from './services/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    SupportComponent,
    PrivacyComponent,
    UseragreementComponent,
    HomecomponentComponent,
    EntryDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppModuleHttpService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

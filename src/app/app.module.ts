import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatDialogModule,MatSidenavModule }  from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppModuleHttpService } from './services/app-module-http.service';
import { HttpClientModule } from '@angular/common/http';
import { SupportComponent } from './components/support/support.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UseragreementComponent } from './components/useragreement/useragreement.component';
import { feedcomponentComponent } from './components/feedcomponent/feedcomponent.component';
import { EntryDetailComponent } from './components/entrydetail/entry-detail.component';
import { MessageService } from './services/messages.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';


@NgModule({
  entryComponents:[ 
    LoginDialogComponent
  ],
  declarations: [
    AppComponent,
    SupportComponent,
    PrivacyComponent,
    UseragreementComponent,
    feedcomponentComponent,
    EntryDetailComponent,
    AboutUsComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule
  ],
  providers: [AppModuleHttpService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

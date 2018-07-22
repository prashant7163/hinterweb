import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AppModuleHttpService } from './services/app-module-http.service';
import { HttpClientModule } from '@angular/common/http';
import { SupportComponent } from './components/support/support.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UseragreementComponent } from './components/useragreement/useragreement.component';
import { HomecomponentComponent } from './components/homecomponent/homecomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    SupportComponent,
    PrivacyComponent,
    UseragreementComponent,
    HomecomponentComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'hinterwebapp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppModuleHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId=${appId}`);
  }
}

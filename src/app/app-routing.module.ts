import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SupportComponent } from './components/support/support.component';
import { feedcomponentComponent } from './components/feedcomponent/feedcomponent.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UseragreementComponent } from './components/useragreement/useragreement.component';
import { EntryDetailComponent } from './components/entrydetail/entry-detail.component';
import { AboutUsComponent } from './components/about-us/about-us.component';


const routes: Routes = [
  { path: '', component: AboutUsComponent },
  { path: 'support.html', component: SupportComponent },
  { path: 'useragreement.html', component: UseragreementComponent },
  { path: 'privacy.html', component: PrivacyComponent },
  { path: 'feed', component: feedcomponentComponent },
  { path: ':id', component: EntryDetailComponent },
  { path: '*', component: feedcomponentComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

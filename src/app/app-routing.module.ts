import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SupportComponent } from './components/support/support.component';
import { HomecomponentComponent } from './components/homecomponent/homecomponent.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { UseragreementComponent } from './components/useragreement/useragreement.component';
import { EntryDetailComponent } from './components/entrydetail/entry-detail.component';


const routes: Routes = [
  { path: '', component: HomecomponentComponent },
  { path: 'support.html', component: SupportComponent },
  { path: 'useragreement.html', component: UseragreementComponent },
  { path: 'privacy.html', component: PrivacyComponent },
  { path: ':id', component: EntryDetailComponent },
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

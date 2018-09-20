import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './services/messages.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  selectedheader: number = 0;
  showLoader: boolean = false;
  loaderMessageSubscription: Subscription;

  constructor(private messageService: MessageService,private router:Router) { }

  ngOnInit() {
    this.loaderMessageSubscription = this.messageService.loaderMessage$.subscribe((data: boolean) => {
      if (data) {
        setTimeout(() => {
          this.showLoader = true;
        }, 0);
      } else {
        setTimeout(() => {
          this.showLoader = false;
        }, 0);
      }
    });
  }

  ngOnDestroy() {
    if (this.loaderMessageSubscription != null) {
      this.loaderMessageSubscription.unsubscribe();
    }
  }

  getSelectedHeader(type: number): string {
    if (type == this.selectedheader) {
      return 'header-item-selected';
    }
    return '';
  }

  headerClickHandler(type: number): void {
    this.selectedheader = type;
    this.router.navigate(['/']);
  }

}

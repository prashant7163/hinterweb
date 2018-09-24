import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './services/messages.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from './components/dialogs/login-dialog/login-dialog.component';
import { ConstantFunctions } from './services/constant-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  selectedheader: number = 1;
  showLoader: boolean = false;
  loaderMessageSubscription: Subscription;
  isMobileDevice: boolean = false;

  constructor(private messageService: MessageService, private router: Router, public loginDialog: MatDialog) { }

  ngOnInit() {
    this.isMobileDevice = ConstantFunctions.isOnmobileDevice();
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
    switch (type) {
      case 0: {
        this.router.navigate(['/feed']);
        break;
      }
      case 1: {
        this.router.navigate(['/']);
        break;
      }
    }

  }

  showLoginDialog(): void {
    const dialogRef = this.loginDialog.open(LoginDialogComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

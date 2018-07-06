import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var userAgent = navigator.userAgent || navigator.vendor;

    if (/android/i.test(userAgent)) {
      window.location.href = "https://goo.gl/xcZT2a";
    }

    // if (/iPad|iPhone|iPod/i.test(userAgent)) {
    //    window.location.href = "https://goo.gl/fGGi8";
    // }

  }

}

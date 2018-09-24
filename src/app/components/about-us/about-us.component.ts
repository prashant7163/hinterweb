import { Component, OnInit } from '@angular/core';
import { ConstantFunctions } from '../../services/constant-functions';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  isMobileDevice: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isMobileDevice = ConstantFunctions.isOnmobileDevice();
  }

}

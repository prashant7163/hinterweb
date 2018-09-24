import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { feedcomponentComponent } from './feedcomponent.component';

describe('feedcomponentComponent', () => {
  let component: feedcomponentComponent;
  let fixture: ComponentFixture<feedcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ feedcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(feedcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

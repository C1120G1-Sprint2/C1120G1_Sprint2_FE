import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsBookingComponent } from './tickets-booking.component';

describe('TicketsBookingComponent', () => {
  let component: TicketsBookingComponent;
  let fixture: ComponentFixture<TicketsBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAccountManagerComponent } from './nav-bar-account-manager.component';

describe('NavBarAccountManagerComponent', () => {
  let component: NavBarAccountManagerComponent;
  let fixture: ComponentFixture<NavBarAccountManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarAccountManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarAccountManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

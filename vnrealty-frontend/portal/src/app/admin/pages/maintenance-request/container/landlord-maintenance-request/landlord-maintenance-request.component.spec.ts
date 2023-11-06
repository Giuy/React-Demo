import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandlordMaintenanceRequestComponent } from './landlord-maintenance-request.component';

describe('LandlordMaintenanceRequestComponent', () => {
  let component: LandlordMaintenanceRequestComponent;
  let fixture: ComponentFixture<LandlordMaintenanceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandlordMaintenanceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandlordMaintenanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

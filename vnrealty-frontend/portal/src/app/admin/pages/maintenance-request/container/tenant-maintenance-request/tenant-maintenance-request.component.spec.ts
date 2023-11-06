import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantMaintenanceRequestComponent } from './tenant-maintenance-request.component';

describe('TenantMaintenanceRequestComponent', () => {
  let component: TenantMaintenanceRequestComponent;
  let fixture: ComponentFixture<TenantMaintenanceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantMaintenanceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantMaintenanceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingPropertyComponent } from './leasing-property.component';

describe('LeasingPropertyComponent', () => {
  let component: LeasingPropertyComponent;
  let fixture: ComponentFixture<LeasingPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeasingPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeasingPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

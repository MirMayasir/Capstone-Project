import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDrugComponent } from './confirm-drug.component';

describe('ConfirmDrugComponent', () => {
  let component: ConfirmDrugComponent;
  let fixture: ComponentFixture<ConfirmDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDrugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

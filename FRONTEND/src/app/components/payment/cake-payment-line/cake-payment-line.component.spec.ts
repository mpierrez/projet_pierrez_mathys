import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CakePaymentLineComponent } from './cake-payment-line.component';

describe('CakePaymentLineComponent', () => {
  let component: CakePaymentLineComponent;
  let fixture: ComponentFixture<CakePaymentLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CakePaymentLineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CakePaymentLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

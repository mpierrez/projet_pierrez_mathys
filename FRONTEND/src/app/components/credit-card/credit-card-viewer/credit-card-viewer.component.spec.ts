import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardViewerComponent } from './credit-card-viewer.component';

describe('CreditCardViewerComponent', () => {
  let component: CreditCardViewerComponent;
  let fixture: ComponentFixture<CreditCardViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

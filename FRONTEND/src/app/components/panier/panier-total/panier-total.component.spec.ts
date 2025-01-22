import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierTotalComponent } from './panier-total.component';

describe('PanierTotalComponent', () => {
  let component: PanierTotalComponent;
  let fixture: ComponentFixture<PanierTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanierTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

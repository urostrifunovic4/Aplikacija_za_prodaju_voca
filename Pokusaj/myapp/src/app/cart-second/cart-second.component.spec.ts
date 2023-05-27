import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSecondComponent } from './cart-second.component';

describe('CartSecondComponent', () => {
  let component: CartSecondComponent;
  let fixture: ComponentFixture<CartSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

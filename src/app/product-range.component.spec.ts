import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRangeComponent } from './product-range.component';

describe('ProductRangeComponent', () => {
  let component: ProductRangeComponent;
  let fixture: ComponentFixture<ProductRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

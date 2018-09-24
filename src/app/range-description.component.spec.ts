import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeDescriptionComponent } from './range-description.component';

describe('RangeDescriptionComponent', () => {
  let component: RangeDescriptionComponent;
  let fixture: ComponentFixture<RangeDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

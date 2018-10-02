import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDownloadableComponent } from './add-downloadable.component';

describe('AddDownloadableComponent', () => {
  let component: AddDownloadableComponent;
  let fixture: ComponentFixture<AddDownloadableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDownloadableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDownloadableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMonthlyComponent } from './list-monthly.component';

describe('ListMonthlyComponent', () => {
  let component: ListMonthlyComponent;
  let fixture: ComponentFixture<ListMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

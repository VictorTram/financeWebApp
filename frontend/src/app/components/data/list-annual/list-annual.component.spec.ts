import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnualComponent } from './list-annual.component';

describe('ListAnnualComponent', () => {
  let component: ListAnnualComponent;
  let fixture: ComponentFixture<ListAnnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAnnualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

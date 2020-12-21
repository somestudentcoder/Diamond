import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSortTestComponent } from './card-sort-test.component';

describe('CardSortTestComponent', () => {
  let component: CardSortTestComponent;
  let fixture: ComponentFixture<CardSortTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSortTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSortTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

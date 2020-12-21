import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardSortComponent } from './create-card-sort.component';

describe('CreateCardSortComponent', () => {
  let component: CreateCardSortComponent;
  let fixture: ComponentFixture<CreateCardSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCardSortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

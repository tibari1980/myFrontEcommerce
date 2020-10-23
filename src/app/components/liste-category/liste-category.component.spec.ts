import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCategoryComponent } from './liste-category.component';

describe('ListeCategoryComponent', () => {
  let component: ListeCategoryComponent;
  let fixture: ComponentFixture<ListeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

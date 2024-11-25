import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFoodPage } from './edit-food.page';

describe('EditFoodPage', () => {
  let component: EditFoodPage;
  let fixture: ComponentFixture<EditFoodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

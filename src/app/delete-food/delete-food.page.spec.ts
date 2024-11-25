import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteFoodPage } from './delete-food.page';

describe('DeleteFoodPage', () => {
  let component: DeleteFoodPage;
  let fixture: ComponentFixture<DeleteFoodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

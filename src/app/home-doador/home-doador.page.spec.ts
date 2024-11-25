import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeDoadorPage } from './home-doador.page';

describe('HomeDoadorPage', () => {
  let component: HomeDoadorPage;
  let fixture: ComponentFixture<HomeDoadorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeDoadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

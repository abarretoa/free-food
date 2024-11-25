import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeBeneficiadoPage } from './home-beneficiado.page';

describe('HomeBeneficiadoPage', () => {
  let component: HomeBeneficiadoPage;
  let fixture: ComponentFixture<HomeBeneficiadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBeneficiadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlimentosDisponiveisPage } from './alimentos-disponiveis.page';

describe('AlimentosDisponiveisPage', () => {
  let component: AlimentosDisponiveisPage;
  let fixture: ComponentFixture<AlimentosDisponiveisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlimentosDisponiveisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

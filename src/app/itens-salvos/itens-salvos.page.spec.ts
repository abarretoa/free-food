import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItensSalvosPage } from './itens-salvos.page';

describe('ItensSalvosPage', () => {
  let component: ItensSalvosPage;
  let fixture: ComponentFixture<ItensSalvosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensSalvosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

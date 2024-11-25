import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewDonationPage } from './new-donation.page';

describe('NewDonationPage', () => {
  let component: NewDonationPage;
  let fixture: ComponentFixture<NewDonationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDonationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

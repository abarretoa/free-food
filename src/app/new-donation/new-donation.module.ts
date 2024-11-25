import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewDonationPageRoutingModule } from './new-donation-routing.module';

import { NewDonationPage } from './new-donation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewDonationPageRoutingModule
  ],
  declarations: [NewDonationPage]
})
export class NewDonationPageModule {}

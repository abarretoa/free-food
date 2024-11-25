import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewDonationPage } from './new-donation.page';

const routes: Routes = [
  {
    path: '',
    component: NewDonationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewDonationPageRoutingModule {}

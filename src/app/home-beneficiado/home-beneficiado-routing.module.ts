import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeBeneficiadoPage } from './home-beneficiado.page';

const routes: Routes = [
  {
    path: '',
    component: HomeBeneficiadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeBeneficiadoPageRoutingModule {}

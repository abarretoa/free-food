import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeDoadorPage } from './home-doador.page';

const routes: Routes = [
  {
    path: '',
    component: HomeDoadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeDoadorPageRoutingModule {}

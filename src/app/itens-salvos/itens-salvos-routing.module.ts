import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItensSalvosPage } from './itens-salvos.page';

const routes: Routes = [
  {
    path: '',
    component: ItensSalvosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItensSalvosPageRoutingModule {}

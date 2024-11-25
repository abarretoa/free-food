import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteFoodPage } from './delete-food.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteFoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteFoodPageRoutingModule {}

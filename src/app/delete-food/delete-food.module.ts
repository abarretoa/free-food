import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteFoodPageRoutingModule } from './delete-food-routing.module';

import { DeleteFoodPage } from './delete-food.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteFoodPageRoutingModule
  ],
  declarations: [DeleteFoodPage]
})
export class DeleteFoodPageModule {}

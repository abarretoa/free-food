import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeDoadorPageRoutingModule } from './home-doador-routing.module';

import { HomeDoadorPage } from './home-doador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeDoadorPageRoutingModule
  ],
  declarations: [HomeDoadorPage]
})
export class HomeDoadorPageModule {}

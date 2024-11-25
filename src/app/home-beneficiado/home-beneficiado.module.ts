import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeBeneficiadoPageRoutingModule } from './home-beneficiado-routing.module';

import { HomeBeneficiadoPage } from './home-beneficiado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeBeneficiadoPageRoutingModule
  ],
  declarations: [HomeBeneficiadoPage]
})
export class HomeBeneficiadoPageModule {}

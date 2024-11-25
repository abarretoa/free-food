import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentosDisponiveisPageRoutingModule } from './alimentos-disponiveis-routing.module';

import { AlimentosDisponiveisPage } from './alimentos-disponiveis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentosDisponiveisPageRoutingModule
  ],
  declarations: [AlimentosDisponiveisPage]
})
export class AlimentosDisponiveisPageModule {}

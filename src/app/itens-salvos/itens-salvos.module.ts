import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItensSalvosPageRoutingModule } from './itens-salvos-routing.module';

import { ItensSalvosPage } from './itens-salvos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItensSalvosPageRoutingModule
  ],
  declarations: [ItensSalvosPage]
})
export class ItensSalvosPageModule {}

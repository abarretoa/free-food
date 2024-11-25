import { AlimentoService } from './../services/alimento.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'index.page.html',
  styleUrls: ['index.page.scss'],
})
export class IndexPage {
  storage: any;
  seuServico: any;
  router: any;
  itensSalvos: any;
sair() {
  
    
  localStorage.clear();
  console.log("Os dados foram apagados.")
    
}
login() {
throw new Error('Method not implemented.');
}
navigateToRegister() {
throw new Error('Method not implemented.');
}
navigateToLogin() {
throw new Error('Method not implemented.');
}


  constructor() {}

}

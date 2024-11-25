import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service'; // Serviço para acessar os itens salvos
import { Alimento } from '../Models/alimento.model'; // Modelo de Alimento

@Component({
  selector: 'app-itens-salvos',
  templateUrl: './itens-salvos.page.html',
  styleUrls: ['./itens-salvos.page.scss'],
})
export class ItensSalvosPage implements OnInit {
  itensSalvos: Alimento[] = [];  // Lista de itens retirados

  constructor(private storageService: StorageService) {}

  ngOnInit() {
    this.carregarItensSalvos(); // Carrega os itens ao iniciar a página
  }

  // Carrega os itens salvos para retirar
  carregarItensSalvos() {
    this.itensSalvos = this.storageService.getItensSalvos(); // Recupera os itens retirados do serviço
  }
  limparDados() {
    this.itensSalvos = []; // Limpa o array
    console.log('Itens salvos foram limpos.');
  }
}

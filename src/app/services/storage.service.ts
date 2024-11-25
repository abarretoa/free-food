import { Injectable } from '@angular/core';
import { Alimento } from '../Models/alimento.model';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private itensRetiradosKey = 'itensRetirados'; // Chave para o armazenamento dos itens retirados

  constructor() {}

  // Função para salvar os itens retirados no LocalStorage
  salvarItemRetirado(alimento: Alimento, quantidadeRetirada: number): void {
    const itensRetirados = this.getItensSalvos(); // Recupera os itens retirados já salvos
    const alimentoRetirado = { ...alimento, quantidade: quantidadeRetirada }; // Cria uma cópia do alimento retirado com a quantidade

    // Adiciona o alimento retirado à lista de itens retirados
    itensRetirados.push(alimentoRetirado);

    // Salva no LocalStorage
    localStorage.setItem(this.itensRetiradosKey, JSON.stringify(itensRetirados));
  }

  // Função para recuperar os itens retirados do LocalStorage
  getItensSalvos(): Alimento[] {
    try {
      const itensJson = localStorage.getItem(this.itensRetiradosKey);
      if (itensJson) {
        const itens = JSON.parse(itensJson);
        return Array.isArray(itens) ? itens : [];
      } else {
        return []; // Caso não haja itens, retorna um array vazio
      }
    } catch (error) {
      console.error('Erro ao recuperar itens do LocalStorage:', error);
      return []; // Retorna array vazio em caso de erro de parsing ou outros problemas
    }
  }
}

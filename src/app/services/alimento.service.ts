import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Importando BehaviorSubject
import { Alimento } from '../Models/alimento.model';

@Injectable({
  providedIn: 'root',
})
export class AlimentoService {
  private alimentosKey = 'alimentos'; // A chave do LocalStorage onde os alimentos serão armazenados
  private itensRetiradosKey = 'itensRetirados'; // A chave para armazenar os itens retirados
  private alimentosSubject = new BehaviorSubject<Alimento[]>(this.getAlimentos()); // Com BehaviorSubject, sempre que a lista de alimentos for alterada, ele emite a nova lista

  constructor() {}

  // Recupera a lista de alimentos do LocalStorage
  public getAlimentos(): Alimento[] {
    const alimentosJson = localStorage.getItem(this.alimentosKey);
    return alimentosJson ? JSON.parse(alimentosJson) : []; // Retorna os alimentos ou um array vazio se não houver nenhum
  }

  // Retorna um Observable para que as páginas possam se inscrever nas mudanças de alimentos
  public getAlimentosObservable() {
    return this.alimentosSubject.asObservable();
  }

  // Salva a lista de alimentos no LocalStorage e atualiza o BehaviorSubject
  private salvarAlimentos(alimentos: Alimento[]): void {
    localStorage.setItem(this.alimentosKey, JSON.stringify(alimentos)); // Converte o array para JSON e armazena
    this.alimentosSubject.next(alimentos); // Emite a nova lista para quem estiver inscrito no BehaviorSubject
  }

  // Adiciona um novo alimento ao LocalStorage
  addAlimento(alimento: Alimento): void {
    const alimentos = this.getAlimentos();
    alimento.id = this.generateId(); // Gera um ID único para o novo alimento
    alimentos.push(alimento);
    this.salvarAlimentos(alimentos); // Salva os alimentos atualizados
  }

  // Atualiza um alimento pelo ID
  atualizarAlimento(alimento: Alimento): void {
    const alimentos = this.getAlimentos();
    const index = alimentos.findIndex((a) => a.id === alimento.id);
    if (index !== -1) {
      alimentos[index] = alimento; // Substitui o alimento na posição correta
      this.salvarAlimentos(alimentos); // Salva os alimentos atualizados
    }
  }

  // Remove um alimento pelo ID
  removerAlimento(id: number): void {
    const alimentos = this.getAlimentos(); // Obtemos a lista de alimentos
    const index = alimentos.findIndex((a) => a.id === id); // Encontramos o índice do alimento com esse ID
    if (index !== -1) {
      alimentos.splice(index, 1); // Remove o alimento da lista
      this.salvarAlimentos(alimentos); // Atualiza o LocalStorage
    }
  }

  // Gera um ID único para um novo alimento
  private generateId(): number {
    const alimentos = this.getAlimentos();
    return alimentos.length > 0 ? Math.max(...alimentos.map(a => a.id)) + 1 : 1; // Gera um ID único baseado no maior ID atual
  }

  // Função para retirar alimentos (atualiza a quantidade)
  retirarAlimento(id: number, quantidade: number): void {
    const alimentos = this.getAlimentos();
    const index = alimentos.findIndex((a) => a.id === id);
    if (index !== -1) {
      if (alimentos[index].quantidade >= quantidade) {
        alimentos[index].quantidade -= quantidade; // Reduz a quantidade do alimento
        if (alimentos[index].quantidade === 0) {
          this.removerAlimento(id); // Se a quantidade chegar a 0, o alimento é removido
        } else {
          this.salvarAlimentos(alimentos); // Salva a lista de alimentos atualizada
        }
      } else {
        console.log('Quantidade insuficiente para retirada!');
      }
    }
  }

  // Função para salvar os itens retirados
  public salvarItemRetirado(alimento: Alimento, quantidadeRetirada: number): void {
    // Obtém os itens retirados já armazenados
    const itensRetirados = this.getItensRetirados();
    const alimentoRetirado = { ...alimento, quantidade: quantidadeRetirada }; // Cria uma cópia do alimento retirado com a quantidade
    itensRetirados.push(alimentoRetirado); // Adiciona o alimento retirado à lista

    // Salva a lista no LocalStorage
    localStorage.setItem(this.itensRetiradosKey, JSON.stringify(itensRetirados));
  }

  // Função para obter os itens retirados
  public getItensRetirados(): Alimento[] {
    const itensJson = localStorage.getItem(this.itensRetiradosKey);
    return itensJson ? JSON.parse(itensJson) : []; // Retorna a lista de itens retirados ou um array vazio
  }
}

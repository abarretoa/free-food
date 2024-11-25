import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlimentoService } from '../services/alimento.service';
import { Alimento } from '../Models/alimento.model';

@Component({
  selector: 'app-home-doador',
  templateUrl: './home-doador.page.html',
  styleUrls: ['./home-doador.page.scss'],
})
export class HomeDoadorPage implements OnInit {
  nomeCompleto: string = '';
  alimentos: Alimento[] = [];
  novoAlimento: Alimento = {
    id: 0, nome: '', descricao: '', quantidade: 1, localRetirada: '',
    disponivel: false
  }; // Inicializa os campos do novo alimento

  opcoesMenu = [
    { titulo: 'Minhas Doações', url: '/my-donations', icone: 'gift-outline' },
    { titulo: 'Nova Doação', url: '/new-donation', icone: 'add-circle-outline' },
    { titulo: 'Configurações', url: '/configuracoes', icone: 'settings-outline' },
    { titulo: 'Sair', url: '', icone: 'log-out-outline', action: () => this.logout() },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alimentoService: AlimentoService
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadAlimentos();  // Carregar alimentos ao iniciar
  }

  // Carrega os dados do usuário
  async loadUserData() {
    const userData = await this.authService.getUserData();
    if (userData) {
      this.nomeCompleto = userData.fullName || '';
    } else {
      this.nomeCompleto = 'Usuário não encontrado';
    }
  }

  // Carrega os alimentos criados do LocalStorage
  loadAlimentos() {
    this.alimentos = this.alimentoService.getAlimentos(); // Recupera os alimentos do LocalStorage
  }

  // Navega para a página selecionada
  navegarPara(url: string) {
    this.router.navigate([url]);
  }
  navegarParaNovaDoacao() {
    this.router.navigate(['/new-donation']);
  }

  // Função para redirecionar para a página de Minhas Doações
  navegarParaMinhasDoacoes() {
    this.router.navigate(['/my-donations']);
  }

  // Realiza logout e mantém os alimentos no LocalStorage
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
  }

  // Adiciona um novo alimento ao LocalStorage
  adicionarAlimento() {
    if (!this.novoAlimento.nome || !this.novoAlimento.descricao || !this.novoAlimento.localRetirada) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    // Gerando um id único baseado no número de alimentos existentes
    const novoId = this.alimentos.length > 0 ? this.alimentos[this.alimentos.length - 1].id + 1 : 1;
    const alimentoComId: Alimento = { ...this.novoAlimento, id: novoId };

    // Adiciona o alimento no serviço
    this.alimentoService.addAlimento(alimentoComId);

    // Limpa o formulário de criação
    this.novoAlimento = { id: 0 , nome: '', descricao: '', quantidade: 1, localRetirada: '', disponivel: false };

    // Recarrega a lista de alimentos
    this.loadAlimentos();

    alert('Alimento adicionado com sucesso!');
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-beneficiado',
  templateUrl: './home-beneficiado.page.html',
  styleUrls: ['./home-beneficiado.page.scss'],
})
export class HomeBeneficiadoPage implements OnInit {

  nomeCompleto: string = ''; // Nome do beneficiado

  // Opções do menu lateral
  opcoesMenu = [
    { titulo: 'Home', url: '/home-beneficiado', icone: 'home-outline' },
    { titulo: 'Alimentos Disponíveis', url: '/alimentos-disponiveis', icone: 'nutrition-outline' },
    { titulo: 'Configurações', url: '/configuracoes', icone: 'settings-outline' },
    { 
      titulo: 'Sair', 
      url: '', 
      icone: 'log-out-outline', 
      action: () => this.logout() 
    },
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarNomeUsuario();
  }

  // Carrega o nome completo do beneficiado
  async carregarNomeUsuario() {
    const userData = await this.authService.getUserData();
    if (userData) {
      this.nomeCompleto = userData.fullName || 'Usuário';
    } else {
      this.nomeCompleto = 'Usuário não encontrado';
    }
  }

  // Função de logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navegar para outra página via menu
  navegarPara(url: string) {
    this.router.navigate([url]);
  }
  navegarParaHome() {
    this.router.navigate(['/home-beneficiado']);
  }
  navegarParaAlimentosDisponiveis() {
    this.router.navigate(['/alimentos-disponiveis']);;
    }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  nomeCompleto: string = '';
  opcoesMenu: any[] = [];
  platform: any;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.setMenuOptions();
  }

  // Função para definir as opções do menu de acordo com o perfil
  setMenuOptions() {
    const usuario = this.authService.getUserData(); // Recuperando dados do usuário logado
    if (usuario?.perfil === 'beneficiado') {
      this.opcoesMenu = [
        { titulo: 'Home', url: '/home-beneficiado', icone: 'home-outline' },
        { titulo: 'Alimentos Disponíveis', url: '/alimentos-disponiveis', icone: 'nutrition-outline' },
        { titulo: 'Itens Salvos para Retirar', url: '/itens-salvos', icone: 'save-outline' },  // Nova opção
        { titulo: 'Configurações', url: '/configuracoes', icone: 'settings-outline' },
        { titulo: 'Sair', url: '', icone: 'log-out-outline', action: () => this.logout() },
      ];
    } else if (usuario?.perfil === 'doador') {
      this.opcoesMenu = [
        { titulo: 'Home', url: '/home-doador', icone: 'home-outline' },
        { titulo: 'Nova Doação', url: '/new-donation', icone: 'add-circle-outline' },
        { titulo: 'Minhas Doações', url: '/my-donations', icone: 'heart-outline' },
        { titulo: 'Configurações', url: '/configuracoes', icone: 'settings-outline' },
        { titulo: 'Sair', url: '', icone: 'log-out-outline', action: () => this.logout() },
      ];
    }
  }

  // Método para navegar para a página inicial de acordo com o perfil
  navegarParaHome() {
    const usuario = this.authService.getUserData();  // Supondo que o AuthService forneça os dados do usuário autenticado
    if (usuario?.perfil === 'beneficiado') {
      this.router.navigate(['/home-beneficiado']);
    } else if (usuario?.perfil === 'doador') {
      this.router.navigate(['/home-doador']);
    }
  }
navegar(opcao: any) {
    if (opcao.action) {
      opcao.action(); // Se a opção tem uma ação, executa a ação (ex: logout)
    } else {
      this.router.navigate([opcao.url]); // Se não, navega para a URL da opção
    }
  }
  // Função para logout
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); // Redireciona para a tela de login após o logout
    this.platform.pause.subscribe(() => {
      localStorage.clear();
      console.log('LocalStorage limpo após fechar o app');
    });
    
    
  }
  sair() {
    // Limpa todos os dados do LocalStorage
    localStorage.clear();
  }
  navegarParaAlimentosDisponiveis() {
    this.router.navigate(['/alimentos-disponiveis']);  // Redireciona para Alimentos Disponíveis
  }
}

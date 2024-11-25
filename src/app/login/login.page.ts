import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';  // Importe o AppComponent
import { ToastController } from '@ionic/angular'; // Importe o ToastController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private appComponent: AppComponent,  // Injete o AppComponent
    private toastController: ToastController // Injete o ToastController
  ) {}

  async login() {
    try {
      // Recupera os usuários salvos no LocalStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
  
      // Procura o usuário com as credenciais fornecidas
      const user = users.find(
        (u: any) => u.username === this.username && u.password === this.password
      );
  
      if (user) {
        // Salva o usuário atual no LocalStorage para controle de sessão
        localStorage.setItem('currentUser', JSON.stringify(user));
  
        // Exibe um Toast de sucesso
        await this.showToast('Login bem-sucedido!', 'success');
  
        console.log('Usuário logado:', user);
  
        // Chama o método para atualizar o menu de acordo com o perfil
        this.appComponent.setMenuOptions(); // Atualiza o menu
  
        // Verificando o perfil do usuário
        if (user.perfil === 'doador') {
          console.log('Redirecionando para home-doador');
          this.router.navigate(['/home-doador']);
        } else if (user.perfil === 'beneficiado') {
          console.log('Redirecionando para home-beneficiado');
          this.router.navigate(['/home-beneficiado']);
        }
      } else {
        // Exibe um Toast de erro
        await this.showToast('Usuário ou senha inválidos.', 'danger');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      // Exibe um Toast de erro genérico
      await this.showToast('Erro ao fazer login. Tente novamente.', 'danger');
    }
  }

  // Função auxiliar para exibir o Toast
  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // 2 segundos
      color,
    });
    await toast.present();
  }
}

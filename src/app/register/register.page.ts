import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  fullName = '';
  username = '';
  password = '';
  cpf: string = '';
  perfil: string = '';
  cpfError: boolean = false; // "doador" ou "beneficiado"

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController // Injeta o ToastController
  ) {}

  // Função para exibir o Toast
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color, // Cor dinâmica (ex.: 'danger', 'success')
    });
    toast.present();
  }

  validarCpf(event: any) {
    // Remove qualquer caractere que não seja número
    this.cpf = this.cpf.replace(/[^0-9]/g, '');

    // Verifica se o CPF contém apenas números
    const cpfPattern = /^[0-9]*$/;
    this.cpfError = !cpfPattern.test(this.cpf);
  }

  
  
  async register() {
    if (!this.authService.isValidCPF(this.cpf)) {
      this.presentToast('CPF inválido. O CPF deve conter exatamente 11 números.');
      return; // Impede o registro se o CPF for inválido
    }

    try {
      // Recupera os usuários existentes no LocalStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // Verifica se já existe um usuário com o mesmo CPF ou username
      const existingUser = users.find(
        (u: any) => u.username === this.username || u.cpf === this.cpf
      );

      if (existingUser) {
        this.presentToast('Usuário ou CPF já registrado.');
        return; // Interrompe o registro
      }

      // Cria o novo usuário com o perfil
      const newUser = {
        fullName: this.fullName, // Nome completo
        username: this.username,
        password: this.password,
        cpf: this.cpf,
        perfil: this.perfil, // "doador" ou "beneficiado"
      };

      // Salva o novo usuário no LocalStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      // Também salve o username no LocalStorage para identificar o usuário logado
      localStorage.setItem('username', this.username);

      // Exibe o Toast de sucesso
      await this.presentToast('Usuário registrado com sucesso!', 'success');

      // Redireciona para a página de login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao registrar:', error);
      this.presentToast('Erro ao registrar o usuário. Tente novamente.');
    }
  }
}

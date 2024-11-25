import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'user_data'; // Chave para armazenar o usuário
  private storageInitialized = false;

  constructor(private storage: Storage) {
    this.initializeStorage(); // Inicializa o Storage ao criar o serviço
  }

  // Garante que o storage foi inicializado
  private async initializeStorage() {
    await this.storage.create(); // Cria o storage se ainda não estiver criado
    this.storageInitialized = true; // Marca como inicializado
  }

  // Função para garantir que o storage está inicializado antes de acessar
  private async ensureStorageInitialized() {
    if (!this.storageInitialized) {
      await this.initializeStorage(); // Inicializa se ainda não tiver sido feito
    }
  }

  // Registra o usuário
  public isValidCPF(cpf: string): boolean {
    console.log('Validando CPF:', cpf);
  
    if (!cpf) {
      console.log('CPF vazio ou undefined.');
      return false;
    }
  
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos
    console.log('CPF após limpeza:', cpf);
  
    if (cpf.length !== 11) {
      console.log('CPF não tem 11 números.');
      return false;
    }
  
    return true;
  }
  
  
  
  
  async register(fullName: string, username: string, password: string, cpf: string, perfil: string) {
    if (!this.isValidCPF(cpf)) {
      throw new Error('CPF inválido');
    }
    await this.ensureStorageInitialized();
    const user = { username, password, cpf };
    await this.storage.set(this.USER_KEY, user);
  }
  
  
 
  
  



  // Verifica o login do usuário
  async login(username: string, password: string): Promise<{ success: boolean, perfil: string, name: string }> {
    await this.ensureStorageInitialized(); // Garante que o Storage foi inicializado
    const user = await this.storage.get(this.USER_KEY);

    if (user && user.username === username && user.password === password) {
      return { success: true, perfil: user.perfil, name: user.name }; // Agora retorna o nome também
    }
    return { success: false, perfil: '', name: '' }; // Se não encontrar, retorna falso e nome vazio
  }

  
 
  
  


  // Recupera o perfil do usuário
  async getUserProfile(): Promise<string> {
    await this.ensureStorageInitialized(); // Garante que o Storage foi inicializado
    const user = await this.storage.get(this.USER_KEY);
    return user ? user.perfil : ''; // Retorna o perfil do usuário (Doador ou Beneficiado)
  }

  // Recupera os dados do usuário
  getUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const username = localStorage.getItem('username'); // Recupera o username do localStorage

    // Procura o usuário no array de usuários pelo username
    return users.find((user: any) => user.username === username);
  }
  
  logout() {
    localStorage.removeItem('username');  // Remove o usuário logado
    localStorage.removeItem('users');  // Remove todos os usuários do localStorage
  }
}
 


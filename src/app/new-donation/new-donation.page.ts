import { Component } from '@angular/core';
import { AlimentoService } from '../services/alimento.service';
import { Alimento } from '../Models/alimento.model';
import { ToastController } from '@ionic/angular'; // Importando o ToastController

@Component({
  selector: 'app-new-donation',
  templateUrl: './new-donation.page.html',
  styleUrls: ['./new-donation.page.scss'],
})
export class NewDonationPage {
  alimentosTemp: Partial<Alimento>[] = []; // Lista temporária para múltiplos alimentos

  constructor(
    private alimentoService: AlimentoService,
    private toastController: ToastController // Injetando o ToastController
  ) {}

  ionViewWillEnter() {
    this.adicionarAlimentoTemp(); // Inicializa com um campo vazio
  }

  // Adiciona um novo campo de alimento na lista temporária
  adicionarAlimentoTemp() {
    this.alimentosTemp.push({
      nome: '',
      descricao: '',
      quantidade: 1,
      localRetirada: '',
      dataRetirada: '', 
    });
  }

  // Remove um alimento da lista temporária
  removerAlimentoTemp(index: number) {
    this.alimentosTemp.splice(index, 1);
  }

  // Exibir o Toast com mensagem de sucesso
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }

  // Salva todos os alimentos no serviço
  salvarAlimentos() {
    const alimentosValidados = this.alimentosTemp.filter(
      alimento =>
        alimento.nome && 
        alimento.quantidade && 
        alimento.dataRetirada // Verifica se a data está preenchida
    );

    if (alimentosValidados.length > 0) {
      // Adiciona alimentos validados ao LocalStorage
      alimentosValidados.forEach(alimento => {
        this.alimentoService.addAlimento(alimento as Alimento); // Adiciona o alimento ao LocalStorage
      });

      this.alimentosTemp = []; // Limpa a lista temporária
      this.adicionarAlimentoTemp(); // Adiciona um campo vazio novamente

      // Exibe um toast de sucesso
      this.presentToast('Alimentos adicionados com sucesso!', 'success');
    } else {
      // Exibe um toast de aviso
      this.presentToast('Preencha todos os campos corretamente antes de salvar!', 'warning');
    }
  }
}

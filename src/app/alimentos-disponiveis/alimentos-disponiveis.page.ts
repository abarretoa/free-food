import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../services/alimento.service'; // Importando o serviço de alimentos
import { Alimento } from '../Models/alimento.model'; // Certifique-se de ter o modelo de Alimento
import { AlertController } from '@ionic/angular'; // Certifique-se de importar o AlertController corretamente

@Component({
  selector: 'app-alimentos-disponiveis',
  templateUrl: './alimentos-disponiveis.page.html',
  styleUrls: ['./alimentos-disponiveis.page.scss'],
})
export class AlimentosDisponiveisPage implements OnInit {
  alimentosDisponiveis: Alimento[] = []; // Lista de alimentos disponíveis

  constructor(
    private alimentoService: AlimentoService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.carregarAlimentosDisponiveis();
  }

  // Carrega os alimentos disponíveis
  carregarAlimentosDisponiveis() {
    this.alimentosDisponiveis = this.alimentoService.getAlimentos(); // Obtém os alimentos do serviço
  }

  // Função para retirar alimento (caso necessário)
  async retirarAlimento(alimento: Alimento) {
    const alert = await this.alertController.create({
      header: 'Quantos alimentos você deseja retirar?',
      inputs: [
        {
          name: 'quantidade',
          type: 'number',
          placeholder: 'Digite a quantidade',
          min: 1,
          max: alimento.quantidade,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Confirmar',
          handler: (data: { quantidade: string }) => {
            const quantidade = parseInt(data.quantidade, 10);
            if (quantidade <= alimento.quantidade) {
              this.atualizarQuantidadeAlimento(alimento, quantidade);
            } else {
              alert.message = 'Quantidade inválida!';
              alert.present();
            }
          },
        },
      ],
    });

    await alert.present(); // Apresenta o alerta
  }

  // Atualiza a quantidade de alimentos
  atualizarQuantidadeAlimento(alimento: Alimento, quantidadeRetirada: number) {
    alimento.quantidade -= quantidadeRetirada;

    // Salva o item retirado na lista de "Itens Salvos para Retirar"
    this.alimentoService.salvarItemRetirado(alimento, quantidadeRetirada);

    // Se a quantidade do alimento for 0, removemos o alimento da lista de disponíveis
    if (alimento.quantidade <= 0) {
      this.alimentoService.removerAlimento(alimento.id); 
    } else {
      this.alimentoService.atualizarAlimento(alimento); 
    }

    // Recarrega a lista de alimentos
    this.carregarAlimentosDisponiveis();
  }
}

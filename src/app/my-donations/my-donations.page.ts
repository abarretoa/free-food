import { Component, OnInit } from '@angular/core';
import { AlimentoService } from '../services/alimento.service';
import { Alimento } from '../Models/alimento.model';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.page.html',
  styleUrls: ['./my-donations.page.scss'],
})
export class MyDonationsPage implements OnInit {
  alimentos: Alimento[] = [];

  constructor(
    private alimentoService: AlimentoService,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    // Inscrevendo-se no Observable que emite as atualizações dos alimentos
    this.alimentoService.getAlimentosObservable().subscribe((alimentos: Alimento[]) => {
      this.alimentos = alimentos; // Atualiza a lista de alimentos
    });
  }

  // Exibir toast com mensagem e cor personalizadas
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }

  // Função para excluir um alimento
  async deleteAlimento(id: number) {
    const alimento = this.alimentos.find(a => a.id === id);
    if (!alimento) return;

    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Você tem certeza que deseja excluir o alimento "${alimento.nome}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.alimentoService.removerAlimento(id); // Remove o alimento
            this.presentToast(`"${alimento.nome}" foi excluído com sucesso.`, 'danger');
          },
        },
      ],
    });

    await alert.present();
  }

  // Função para editar um alimento
  async editAlimento(alimento: Alimento) {
    const alert = await this.alertController.create({
      header: 'Editar Alimento',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome',
          value: alimento.nome,
        },
        {
          name: 'descricao',
          type: 'text',
          placeholder: 'Descrição',
          value: alimento.descricao,
        },
        {
          name: 'quantidade',
          type: 'number',
          placeholder: 'Quantidade',
          value: alimento.quantidade,
          min: 1,
        },
        {
          name: 'localRetirada',
          type: 'text',
          placeholder: 'Local de Retirada',
          value: alimento.localRetirada,
        },
        {
            name: 'dataRetirada',
            type: 'date',
            placeholder: 'Data de Retirada',
            value: alimento.dataRetirada, // A data atual do alimento será preenchida aqui
          
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salvar',
          handler: (data) => {
            if (data.nome && data.descricao && data.quantidade > 0 && data.localRetirada) {
              const updatedAlimento: Alimento = {
                ...alimento,
                nome: data.nome,
                descricao: data.descricao,
                quantidade: parseInt(data.quantidade, 10),
                localRetirada: data.localRetirada, // Atualiza o local de retirada
                dataRetirada: data.dataRetirada
              };
  
              this.alimentoService.atualizarAlimento(updatedAlimento); // Atualiza o alimento no serviço
              this.presentToast(`"${updatedAlimento.nome}" foi atualizado com sucesso.`, 'success');
            } else {
              this.presentToast('Por favor, preencha todos os campos corretamente.', 'warning');
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
}  
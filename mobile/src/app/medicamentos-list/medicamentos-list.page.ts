import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { MedicamentosFormPage } from '../medicamentos-form/medicamentos-form.page';

interface Medicamento {
  idmedicamento: number;
  nombre: string;
  descripcion: string;
  activo: number
}

@Component({
  selector: 'app-medicamentos-list',
  templateUrl: './medicamentos-list.page.html',
  styleUrls: ['./medicamentos-list.page.scss'],
  standalone: false,
})
export class MedicamentosListPage implements OnInit {

  medicamentos: Medicamento[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarMedicamentos();
  }

  async cargarMedicamentos(): Promise<void> {
    try {
      const response = await axios.get<{ data: Medicamento[] }>(
        `${environment.apiUrl}/items/medicamento`
      );
      this.medicamentos = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los medicamentos:', error);
    }
  }

  /* Mostrar formulario de nuevo medicamento */
  async nuevoMedicamento(): Promise<void> {
  const modal = await this.modalController.create({
    component: MedicamentosFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarMedicamentos();
  }
}

/* Editar medicamento */
async editarMedicamento(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: MedicamentosFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarMedicamentos();
  }
}

/* Eliminar medicamento */
async confirmarEliminar(id: number, nombre: string): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar medicamento',
    message: `¿Estás seguro de eliminar el medicamento "${nombre}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarMedicamento(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarMedicamento(id: number): Promise<void> {
  try {
    await axios.delete(
      `${environment.apiUrl}/items/medicamento/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'Medicamento eliminado',
      message: 'El medicamento fue eliminado correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarMedicamentos();
  } catch (error) {
    console.error('Error al eliminar el medicamento:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar el medicamento. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}

}

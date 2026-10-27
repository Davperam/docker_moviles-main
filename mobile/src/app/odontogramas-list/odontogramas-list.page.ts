import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { OdontogramasFormPage } from '../odontogramas-form/odontogramas-form.page';

interface Odontograma {
  idodontograma: number;
  idexpediente: number;
  fecharegistro: string;
  observaciones: string;
  diente: string;
  estado: string;
  tratamiento: string;
}

@Component({
  selector: 'app-odontogramas-list',
  templateUrl: './odontogramas-list.page.html',
  styleUrls: ['./odontogramas-list.page.scss'],
  standalone: false,
})
export class OdontogramasListPage {

  titulo: string = 'Odontogramas';

    total: number = 0;
    paginaActual: number = 1;
    porPagina: number = 5;

  odontogramas: Odontograma[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarOdontogramas(): Promise<void> {
    try {
      const response = await axios.get<{ data: Odontograma[] }>(
        `${environment.apiUrl}/items/odontograma`,
         {
        params: {
          limit: this.porPagina,
          page: this.paginaActual,
          sort: 'idodontograma'
        }
      }
      );
      this.odontogramas = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los odontogramas:', error);
    }
  } 

  async nuevoOdontograma(): Promise<void> {
  const modal = await this.modalController.create({
    component: OdontogramasFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarOdontogramas();
  }
}

/* Editar odontograma */

async editarOdontograma(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: OdontogramasFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarOdontogramas();
  }
}

/* Eliminar odontograma */

async confirmarEliminar(id: number, nombre: string): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar odontograma',
    message: `¿Estás seguro de eliminar el odontograma "${nombre}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarOdontograma(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarOdontograma(id: number): Promise<void> {
  try {
    await axios.delete(
      `${environment.apiUrl}/items/odontograma/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'Odontograma eliminado',
      message: 'El odontograma fue eliminado correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarOdontogramas();
  } catch (error) {
    console.error('Error al eliminar el odontograma:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar el odontograma. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}

/* Paginación */
async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/odontograma?aggregate[count]=*`
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de productos:',
      error
    );

    this.total = 0;
  }
}
private ajustarPaginaActual(): void {
  const totalPaginas = Math.ceil(
    this.total / this.porPagina
  );

  if (totalPaginas === 0) {
    this.paginaActual = 1;
    return;
  }

  if (this.paginaActual > totalPaginas) {
    this.paginaActual = totalPaginas;
  }
}
async cargarDatos(): Promise<void> {
  await this.cargarTotal();
  this.ajustarPaginaActual();
  await this.cargarOdontogramas();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarOdontogramas();
}

}

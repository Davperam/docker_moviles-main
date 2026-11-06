import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { NotaclinicaFormPage } from '../notaclinica-form/notaclinica-form.page';

interface NotaClinica {
  idnota: number;
  idexpediente: number;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

@Component({
  selector: 'app-notaclinica-list',
  templateUrl: './notaclinica-list.page.html',
  styleUrls: ['./notaclinica-list.page.scss'],
  standalone: false,
})
export class NotaclinicaListPage {
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 5;

  titulo: string = 'Notas clínicas';

  notas: NotaClinica[] = [];

  constructor(
     private modalController: ModalController,
     private alertController: AlertController
  ) { }

 ionViewWillEnter(): void {
  void this.cargarDatos();
}

  async cargarNotas(): Promise<void> {
    try {
      const response = await axios.get<{ data: NotaClinica[] }>(
        `${environment.apiUrl}/items/notaclinica`,
        {
        params: {
          limit: this.porPagina,
          page: this.paginaActual,
          sort: 'idnota'
        }
      }
      );
      this.notas = response.data.data; 

    } catch (error) {
      console.error('Error al cargar las notas clínicas:', error);
    }
  }

  async nuevaNotaclinica(): Promise<void> {
  const modal = await this.modalController.create({
    component: NotaclinicaFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarNotas();
  }
}
/* Actualizar datos */
async editarNota(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: NotaclinicaFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarNotas();
  }
}

/* Función de eliminar */

async confirmarEliminar(id: number): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar nota',
    message: `¿Estás seguro de eliminar la nota clinica "${id}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarNota(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarNota(id: number): Promise<void> {
  try {
    await axios.delete(
      `${environment.apiUrl}/items/notaclinica/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'Nota Clinica eliminada',
      message: 'La Nota clinica fue eliminada correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarDatos();
  } catch (error) {
    console.error('Error al eliminar la nota clinica:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar la nota. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}

/* Paginacion */

async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/notaclinica?aggregate[count]=*`
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
  await this.cargarNotas();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarNotas();
}

}

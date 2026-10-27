import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { CitasFormPage } from '../citas-form/citas-form.page';

interface Cita {
  idcita: number;
  idpaciente: number;
  iddentista: number;
  idestadocita: number;
  fecha: string;
  horainicio: string;
  horafin: string;
  motivo: string;
  observaciones: string;
}

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.page.html',
  styleUrls: ['./citas-list.page.scss'],
  standalone: false,
})
export class CitasListPage {
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = 'Citas';

  citas: Cita[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarCita(): Promise<void> {
    try {
      const response = await axios.get<{ data: Cita[] }>(
        `${environment.apiUrl}/items/cita`,
        {
        params: {
          limit: this.porPagina,
          page: this.paginaActual,
          sort: 'idcita',
        }
      }
      );
      this.citas = response.data.data; 
    } catch (error) {
      console.error('Error al cargar las citas:', error);
    }
  }

  async nuevaCita(): Promise<void> {
  const modal = await this.modalController.create({
    component: CitasFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });


  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarCita();
  }
}

async editarCita(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: CitasFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarCita();
  }
}

/* Eliminar cita */
async confirmarEliminar(id: number, nombre: string): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar cita',
    message: `¿Estás seguro de eliminar la cita "${nombre}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarCita(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarCita(id: number): Promise<void> {
  try {
    // 1. Primero buscamos y eliminamos los registros dependientes en `citadetalle`
    try {
      const responseDetalle = await axios.get(
        `${environment.apiUrl}/items/citadetalle?filter[idcita][_eq]=${id}`
      );
      const detalles = responseDetalle.data.data;

      if (detalles && detalles.length > 0) {
        for (const detalle of detalles) {
          // Usamos el nombre real de la llave primaria de tu diagrama: iddetallecita
          const idDetalle = detalle.iddetallecita || detalle.iddetalle || detalle.id;
          
          if (idDetalle) {
            await axios.delete(`${environment.apiUrl}/items/citadetalle/${idDetalle}`);
          }
        }
      }
    } catch (errDetalle) {
      console.warn('No se encontraron detalles previos o ya fueron eliminados:', errDetalle);
    }

    // 2. Ahora procedemos a eliminar la cita principal
    await axios.delete(
      `${environment.apiUrl}/items/cita/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'Cita eliminada',
      message: 'La cita fue eliminada correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarCita();
  } catch (error) {
    console.error('Error al eliminar la cita:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar la cita. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}

async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/cita?aggregate[count]=*`
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de citas:',
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
  await this.cargarCita();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarCita();
}

}

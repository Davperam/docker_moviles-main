import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { ServiciosFormPage } from '../servicios-form/servicios-form.page';

interface Servicio {
  idservicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
  activo: number;
}

@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.page.html',
  styleUrls: ['./servicios-list.page.scss'],
  standalone: false,
})
export class ServiciosListPage implements OnInit {
  titulo: string = 'Servicios de Consultorio';

  servicios: Servicio[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarServicios();
  }

  async cargarServicios(): Promise<void> {
    try {
      const response = await axios.get<{ data: Servicio[] }>(
        `${environment.apiUrl}/items/servicio`
      );
      this.servicios = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los servicios:', error);
    }
  }

  async nuevoServicio(): Promise<void> {
  const modal = await this.modalController.create({
    component: ServiciosFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarServicios();
  }
}
/* Editar */
async editarServicio(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: ServiciosFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarServicios();
  }
}

/* Eliminar */
async confirmarEliminar(id: number, nombre: string): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar servicio',
    message: `¿Estás seguro de eliminar el servicio "${nombre}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarServicio(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarServicio(id: number): Promise<void> {
  try {
    await axios.delete(
      `${environment.apiUrl}/items/servicio/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'Servicio eliminado',
      message: 'El servicio fue eliminado correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarServicios();
  } catch (error) {
    console.error('Error al eliminar el servicio:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar el servicio. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}

}

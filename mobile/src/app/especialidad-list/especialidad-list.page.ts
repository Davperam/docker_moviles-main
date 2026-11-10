import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { EspecialidadFormPage } from '../especialidad-form/especialidad-form.page';

interface Especialidad {
  idespecialidad: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.page.html',
  styleUrls: ['./especialidad-list.page.scss'],
  standalone: false,
})
export class EspecialidadListPage implements OnInit {
  titulo: string = 'Especialidades Consultorio';

  especialidades: Especialidad[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarEspecialidades();
  }

  async cargarEspecialidades(): Promise<void> {
    try {
      const response = await axios.get<{ data: Especialidad[] }>(
        `${environment.apiUrl}/items/especialidad`
      );
      this.especialidades = response.data.data; 
    } catch (error) {
      console.error('Error al cargar las especialidades:', error);
    }
  }

  async nuevaEspecialidad(): Promise<void> {
    const modal = await this.modalController.create({
      component: EspecialidadFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.guardado) {
      await this.cargarEspecialidades();
    }
  }
  /* Editar especialidad */
  async editarEspecialidad(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: EspecialidadFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarEspecialidades();
  }
}

async confirmarEliminar(id: number, nombre: string): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar Especialidad',
    message: `¿Estás seguro de eliminar la especialidad "${nombre}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarEspecialidad(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarEspecialidad(id: number): Promise<void> {
  try {
    await axios.delete(
      `${environment.apiUrl}/items/especialidad/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'especialidad eliminado',
      message: 'La especialidad fue eliminada correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarEspecialidades();
  } catch (error) {
    console.error('Error al eliminar la especialidad:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar la especialidad. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}

}

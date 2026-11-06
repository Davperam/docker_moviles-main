import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
import { PacientesFormPage } from '../pacientes-form/pacientes-form.page';

interface Paciente {
  idpaciente: number;
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: string;
  telefono: string;
  correo: string;
  direccion: string;
  registro: string;
  activo: number;
}

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.page.html',
  styleUrls: ['./pacientes-list.page.scss'],
  standalone: false,
})
export class PacientesListPage {
  busqueda: string = '';

  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = 'Pacientes';

  pacientes: Paciente[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter(): void {
    this.cargarDatos();
  }

  async cargarPacientes(): Promise<void> {
    try {
      const response = await axios.get<{ data: Paciente[] }>(
        `${environment.apiUrl}/items/paciente`,
        {
        params: {
          limit: this.porPagina,
          page: this.paginaActual,
          sort: 'idpaciente',
          ...this.parametrosBusqueda()
        }
      }
    );
      this.pacientes = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los pacientes:', error);
    }
  }

  async nuevoPaciente(): Promise<void> {
    const modal = await this.modalController.create({
      component: PacientesFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    if (data?.guardado) {
      await this.cargarPacientes();
    }
  }

  async editarPaciente(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: PacientesFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarPacientes();
  }
}
/* Eliminación */
async confirmarEliminar(id: number, nombre: string): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar paciente',
    message: `¿Estás seguro de eliminar el paciente "${nombre}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarPaciente(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarPaciente(id: number): Promise<void> {
  try {
    await axios.delete(
      `${environment.apiUrl}/items/paciente/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'Paciente eliminado',
      message: 'El paciente fue eliminado correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarPacientes();
  } catch (error) {
    console.error('Error al eliminar el paciente:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar el paciente. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}


/* Paginación */
async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/paciente?aggregate[count]=*`,
      { params: this.parametrosBusqueda() }
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de pacientes:',
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
  await this.cargarPacientes();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarPacientes();
}

/* Busqueda */

  private parametrosBusqueda(): Record<string, string> {
    const texto = this.busqueda.trim();
    return texto ? {
      filter: JSON.stringify({
        _or: [
          { nombre: { _icontains: texto } },
          { paterno: { _icontains: texto } },
          { materno: { _icontains: texto } },
        ]
      })
    } : {};
  }

  async handleInput(event: CustomEvent<{ value?: string | null }>): Promise<void> {
    this.busqueda = event.detail.value ?? '';
    this.paginaActual = 1;
    await this.cargarDatos();
  }

}

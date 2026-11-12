import { Component} from '@angular/core';
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
export class EspecialidadListPage {
  titulo: string = 'Especialidades Consultorio';
  busqueda: string = '';

  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  especialidades: Especialidad[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) {}

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarEspecialidades(): Promise<void> {
    try {
      const response = await axios.get<{ data: Especialidad[] }>(
        `${environment.apiUrl}/items/especialidad`,
        {
          params: {
            limit: this.porPagina,
            page: this.paginaActual,
            sort: 'idespecialidad',
            ...this.parametrosBusqueda()
          }
        }
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

    await this.cargarDatos();
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

async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/especialidad?aggregate[count]=*`,
      { params: this.parametrosBusqueda() }
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de especialidades:',
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
  await this.cargarEspecialidades();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarEspecialidades();
}

/* Busqueda */
  private parametrosBusqueda(): Record<string, string> {
    const texto = this.busqueda.trim();
    return texto ? {
      filter: JSON.stringify({
        _or: [
          { nombre: { _icontains: texto } },
          { descripcion: { _icontains: texto } }
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

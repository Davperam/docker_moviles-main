import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

import { ModalController } from '@ionic/angular';
import { AlergiaFormPage } from '../alergia-form/alergia-form.page';
import { AlergiasService } from '../services/alergia-service';

interface Alergia {
  idalergia: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-alergia-list',
  templateUrl: './alergia-list.page.html',
  styleUrls: ['./alergia-list.page.scss'],
  standalone: false,
})
export class AlergiaListPage {
  busqueda: string = '';
  
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 10;

  titulo: string = 'Alergias';

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private alergiaService: AlergiasService
  ) { }

  alergias: Alergia[] = [];

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

async cargarAlergia(): Promise<void> {
    try {
      this.alergias = await firstValueFrom(this.alergiaService.listado(this.paginaActual, this.porPagina, this.busqueda));

    } catch (error) {
      console.error('Error al cargar las alergias:', error);
    }
}

async nuevaAlergia(): Promise<void> {
  const modal = await this.modalController.create({
    component: AlergiaFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarDatos();
  }
}

/* Editar alergias */
async editarAlergia(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: AlergiaFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarAlergia();
  }
}

/* Eliminar alergias */
async confirmarEliminar(id: number, nombre: string): Promise<void> {
  const alerta = await this.alertController.create({
    header: 'Eliminar alergia',
    message: `¿Estás seguro de eliminar la alergia "${nombre}"?`,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: () => {
          void this.eliminarAlergia(id);
        }
      }
    ]
  });

  await alerta.present();
}
async eliminarAlergia(id: number): Promise<void> {
  try {
    await firstValueFrom(this.alergiaService.eliminar(id));

    const alerta = await this.alertController.create({
      header: 'Alergia eliminada',
      message: 'La alergia fue eliminada correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarAlergia();
  } catch (error) {
    console.error('Error al eliminar la alergia:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible eliminar la alergia. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  }
}

 /* paginacion */
async cargarTotal(): Promise<void> {
  try { this.total = await firstValueFrom(this.alergiaService.total(this.busqueda));
  } catch (error) {
      console.error(
        'Error al obtener el total de alergias:', error ); this.total = 0; }
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
  await this.cargarAlergia();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarAlergia();
}
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

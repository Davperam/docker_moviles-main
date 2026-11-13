import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { DentistasService } from '../services/dentistas';
import { DentistasFormPage } from '../dentistas-form/dentistas-form.page';

interface Dentista {
  iddentista: number;
  nombre: string;
  paterno: string;
  materno: string;
  cedula: string;
  telefono: string;
  correo: string;
  activo: number;
}

@Component({
  selector: 'app-dentistas-list',
  templateUrl: './dentistas-list.page.html',
  styleUrls: ['./dentistas-list.page.scss'],
  standalone: false,
})
export class DentistasListPage {
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = 'Dentistas';
  busqueda: string = '';

  dentistas: Dentista[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private dentistasService: DentistasService
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarDentistas(): Promise<void> {
    try {
      this.dentistas = await firstValueFrom(
        this.dentistasService.listado(this.paginaActual, this.porPagina, this.busqueda)
      );
    } catch (error) {
      console.error('Error al cargar los dentistas:', error);
    }
  }

  async nuevoDentista(): Promise<void> {
    const modal = await this.modalController.create({
      component: DentistasFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.guardado) {
      await this.cargarDatos();
    }
  }

  async editarDentista(id: number): Promise<void> {
    const modal = await this.modalController.create({
      component: DentistasFormPage,
      componentProps: { id: id },
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.guardado) {
      await this.cargarDatos();
    }
  }

  async confirmarEliminar(id: number, nombre: string): Promise<void> {
    const alerta = await this.alertController.create({
      header: 'Eliminar dentista',
      message: `¿Estás seguro de eliminar el dentista "${nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            void this.eliminarDentista(id);
          }
        }
      ]
    });

    await alerta.present();
  }

  async eliminarDentista(id: number): Promise<void> {
    try {
      await firstValueFrom(this.dentistasService.eliminar(id));

      const alerta = await this.alertController.create({
        header: 'Dentista eliminado',
        message: 'El dentista fue eliminado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.cargarDatos();
    } catch (error) {
      console.error('Error al eliminar el dentista:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible eliminar el dentista. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    }
  }

  async cargarTotal(): Promise<void> {
    try {
      this.total = await firstValueFrom(this.dentistasService.total(this.busqueda));
    } catch (error) {
      console.error('Error al obtener el total de dentistas:', error);
      this.total = 0;
    }
  }

  private ajustarPaginaActual(): void {
    const totalPaginas = Math.ceil(this.total / this.porPagina);

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
    await this.cargarDentistas();
  }

  async cambiarPagina(pagina: number): Promise<void> {
    this.paginaActual = pagina;
    await this.cargarDentistas();
  }

  async handleInput(event: CustomEvent<{ value?: string | null }>): Promise<void> {
    this.busqueda = event.detail.value ?? '';
    this.paginaActual = 1;
    await this.cargarDatos();
  }
}
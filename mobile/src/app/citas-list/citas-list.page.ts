import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { CitasService } from '../services/citas';
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
  busqueda: string = '';
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = 'Citas';

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private citasService: CitasService
  ) {}

  citas: Cita[] = [];

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarCitas(): Promise<void> {
    try {
      this.citas = await firstValueFrom(
        this.citasService.listado(this.paginaActual, this.porPagina, this.busqueda)
      );
    } catch (error) {
      console.error('Error al cargar citas:', error);
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
      await this.cargarDatos();
    }
  }

  async editarCita(id: number): Promise<void> {
    const modal = await this.modalController.create({
      component: CitasFormPage,
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
      await firstValueFrom(this.citasService.eliminar(id));

      const alerta = await this.alertController.create({
        header: 'Cita eliminada',
        message: 'La cita fue eliminada correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.cargarDatos();
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
      this.total = await firstValueFrom(this.citasService.total(this.busqueda));
    } catch (error) {
      this.total = 0;
      console.error('Error al contar citas:', error);
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
    await this.cargarCitas();
  }

  async cambiarPagina(pagina: number): Promise<void> {
    this.paginaActual = pagina;
    await this.cargarCitas();
  }

  async handleInput(event: CustomEvent<{ value?: string | null }>): Promise<void> {
    this.busqueda = event.detail.value ?? '';
    this.paginaActual = 1;
    await this.cargarDatos();
  }
}
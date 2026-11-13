import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ExpedienteclinicoService } from '../services/expedienteclinico';
import { ExpedienteclinicoFormPage } from '../expedienteclinico-form/expedienteclinico-form.page';

interface ExpedienteClinico {
  idexpediente: number;
  idpaciente: number;
  enfermedades: string;
  observaciones: string;
  apertura: string;
}

@Component({
  selector: 'app-expedienteclinico-list',
  templateUrl: './expedienteclinico-list.page.html',
  styleUrls: ['./expedienteclinico-list.page.scss'],
  standalone: false,
})
export class ExpedienteclinicoListPage {
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;
  busqueda: string = '';

  titulo: string = 'Lista de Expedientes Clínicos';

  expedientes: ExpedienteClinico[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private expedientesService: ExpedienteclinicoService
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarExpedientes(): Promise<void> {
    try {
      this.expedientes = await firstValueFrom(
        this.expedientesService.listado(this.paginaActual, this.porPagina, this.busqueda)
      );
    } catch (error) {
      console.error('Error al cargar los expedientes clínicos:', error);
    }
  }

  async editarExpedienteclinico(id: number): Promise<void> {
    const modal = await this.modalController.create({
      component: ExpedienteclinicoFormPage,
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

  async nuevoExpedienteclinico(): Promise<void> {
    const modal = await this.modalController.create({
      component: ExpedienteclinicoFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.guardado) {
      await this.cargarDatos();
    }
  }

  async confirmarEliminar(id: number): Promise<void> {
    const alerta = await this.alertController.create({
      header: 'Eliminar expediente clínico',
      message: `¿Estás seguro de eliminar el expediente clínico "${id}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            void this.eliminarExpedienteclinico(id);
          }
        }
      ]
    });

    await alerta.present();
  }

  async eliminarExpedienteclinico(id: number): Promise<void> {
    try {
      await firstValueFrom(this.expedientesService.eliminar(id));

      const alerta = await this.alertController.create({
        header: 'Expediente clínico eliminado',
        message: 'El expediente clínico fue eliminado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.cargarDatos();
    } catch (error) {
      console.error('Error al eliminar el expediente:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible eliminar el expediente. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    }
  }

  async cargarTotal(): Promise<void> {
    try {
      this.total = await firstValueFrom(this.expedientesService.total(this.busqueda));
    } catch (error) {
      console.error('Error al obtener el total de expedientes:', error);
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
    await this.cargarExpedientes();
  }

  async cambiarPagina(pagina: number): Promise<void> {
    this.paginaActual = pagina;
    await this.cargarExpedientes();
  }

  async handleInput(event: CustomEvent<{ value?: string | null }>): Promise<void> {
    this.busqueda = event.detail.value ?? '';
    this.paginaActual = 1;
    await this.cargarDatos();
  }
}
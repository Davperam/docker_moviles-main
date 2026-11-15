import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ServiciosService } from '../services/servicios';
import { ServiciosFormPage } from '../servicios-form/servicios-form.page';

interface Servicio {
  idservicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string | number;
  activo?: number;
}

@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.page.html',
  styleUrls: ['./servicios-list.page.scss'],
  standalone: false,
})
export class ServiciosListPage {
  titulo: string = 'Servicios de Consultorio';
  busqueda: string = '';

  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  servicios: Servicio[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private serviciosService: ServiciosService
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarServicios(): Promise<void> {
    try {
      this.servicios = await firstValueFrom(
        this.serviciosService.listado(this.paginaActual, this.porPagina, this.busqueda)
      );
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
      await this.cargarDatos();
    }
  }

  async editarServicio(id: number): Promise<void> {
    const modal = await this.modalController.create({
      component: ServiciosFormPage,
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
      await firstValueFrom(this.serviciosService.eliminar(id));

      const alerta = await this.alertController.create({
        header: 'Servicio eliminado',
        message: 'El servicio fue eliminado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.cargarDatos();
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

  async cargarTotal(): Promise<void> {
    try {
      this.total = await firstValueFrom(this.serviciosService.total(this.busqueda));
    } catch (error) {
      console.error('Error al obtener el total de servicios:', error);
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
    await this.cargarServicios();
  }

  async cambiarPagina(pagina: number): Promise<void> {
    this.paginaActual = pagina;
    await this.cargarServicios();
  }

  async handleInput(event: CustomEvent<{ value?: string | null }>): Promise<void> {
    this.busqueda = event.detail.value ?? '';
    this.paginaActual = 1;
    await this.cargarDatos();
  }
}
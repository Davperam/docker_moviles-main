import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { MedicamentosService } from '../services/medicamentos';
import { MedicamentosFormPage } from '../medicamentos-form/medicamentos-form.page';

interface Medicamento {
  idmedicamento: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-medicamentos-list',
  templateUrl: './medicamentos-list.page.html',
  styleUrls: ['./medicamentos-list.page.scss'],
  standalone: false,
})
export class MedicamentosListPage {
  titulo: string = 'Medicamentos';
  busqueda: string = '';

  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  medicamentos: Medicamento[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private medicamentosService: MedicamentosService
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarMedicamentos(): Promise<void> {
    try {
      this.medicamentos = await firstValueFrom(
        this.medicamentosService.listado(this.paginaActual, this.porPagina, this.busqueda)
      );
    } catch (error) {
      console.error('Error al cargar los medicamentos:', error);
    }
  }

  async nuevoMedicamento(): Promise<void> {
    const modal = await this.modalController.create({
      component: MedicamentosFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.guardado) {
      await this.cargarDatos();
    }
  }

  async editarMedicamento(id: number): Promise<void> {
    const modal = await this.modalController.create({
      component: MedicamentosFormPage,
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
      header: 'Eliminar medicamento',
      message: `¿Estás seguro de eliminar el medicamento "${nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            void this.eliminarMedicamento(id);
          }
        }
      ]
    });

    await alerta.present();
  }

  async eliminarMedicamento(id: number): Promise<void> {
    try {
      await firstValueFrom(this.medicamentosService.eliminar(id));

      const alerta = await this.alertController.create({
        header: 'Medicamento eliminado',
        message: 'El medicamento fue eliminado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.cargarDatos();
    } catch (error) {
      console.error('Error al eliminar el medicamento:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible eliminar el medicamento. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    }
  }

  async cargarTotal(): Promise<void> {
    try {
      this.total = await firstValueFrom(this.medicamentosService.total(this.busqueda));
    } catch (error) {
      console.error('Error al obtener el total de medicamentos:', error);
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
    await this.cargarMedicamentos();
  }

  async cambiarPagina(pagina: number): Promise<void> {
    this.paginaActual = pagina;
    await this.cargarMedicamentos();
  }

  async handleInput(event: CustomEvent<{ value?: string | null }>): Promise<void> {
    this.busqueda = event.detail.value ?? '';
    this.paginaActual = 1;
    await this.cargarDatos();
  }
}
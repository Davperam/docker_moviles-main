import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { DocumentosclinicosService } from '../services/documentosclinicos';
import { DocumentosclinicosFormPage } from '../documentosclinicos-form/documentosclinicos-form.page';

interface DocumentoClinico {
  iddocumento: number;
  idexpediente: number;
  nombredocumento: string;
  rutaarchivo: string;
  tipodocumento: string;
  fechacarga: string;
  activo: number;
}

@Component({
  selector: 'app-documentosclinicos-list',
  templateUrl: './documentosclinicos-list.page.html',
  styleUrls: ['./documentosclinicos-list.page.scss'],
  standalone: false,
})
export class DocumentosclinicosListPage {

  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = 'Documentos clínicos';
  busqueda: string = '';

  documentos: DocumentoClinico[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private documentosService: DocumentosclinicosService
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarDocumentos(): Promise<void> {
    try {
      this.documentos = await firstValueFrom(
        this.documentosService.listado(this.paginaActual, this.porPagina, this.busqueda)
      );
    } catch (error) {
      console.error('Error al cargar los documentos clínicos:', error);
    }
  }

  async nuevoDocumento(): Promise<void> {
    const modal = await this.modalController.create({
      component: DocumentosclinicosFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.guardado) {
      await this.cargarDatos();
    }
  }

  async editarDocumento(id: number): Promise<void> {
    const modal = await this.modalController.create({
      component: DocumentosclinicosFormPage,
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
      header: 'Eliminar documento',
      message: `¿Estás seguro de eliminar el documento "${nombre}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            void this.eliminarDocumento(id);
          }
        }
      ]
    });

    await alerta.present();
  }

  async eliminarDocumento(id: number): Promise<void> {
    try {
      await firstValueFrom(this.documentosService.eliminar(id));

      const alerta = await this.alertController.create({
        header: 'Documento eliminado',
        message: 'El documento fue eliminado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.cargarDatos();
    } catch (error) {
      console.error('Error al eliminar el documento:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible eliminar el documento. Revisa la conexión, los permisos de eliminación en Directus y las relaciones del registro.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    }
  }

  async cargarTotal(): Promise<void> {
    try {
      this.total = await firstValueFrom(this.documentosService.total(this.busqueda));
    } catch (error) {
      console.error('Error al obtener el total de documentos:', error);
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
    await this.cargarDocumentos();
  }

  async cambiarPagina(pagina: number): Promise<void> {
    this.paginaActual = pagina;
    await this.cargarDocumentos();
  }

  async handleInput(event: CustomEvent<{ value?: string | null }>): Promise<void> {
    this.busqueda = event.detail.value ?? '';
    this.paginaActual = 1;
    await this.cargarDatos();
  }
}
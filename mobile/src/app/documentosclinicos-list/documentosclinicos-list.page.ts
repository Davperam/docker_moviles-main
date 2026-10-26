import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController, AlertController } from '@ionic/angular';
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
export class DocumentosclinicosListPage implements OnInit {
  titulo: string = 'Documentos clínicos';

  documentos: DocumentoClinico[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.cargarDocumentos();
  }

  async cargarDocumentos(): Promise<void> {
    try {
      const response = await axios.get<{ data: DocumentoClinico[] }>(
        `${environment.apiUrl}/items/documentoclinico`
      );
      this.documentos = response.data.data; 
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
    await this.cargarDocumentos();
  }
}

/* Editar documento clínico */
async editarDocumento(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: DocumentosclinicosFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarDocumentos();
  }
}

/* Eliminar documento clinico */

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
    await axios.delete(
      `${environment.apiUrl}/items/documentoclinico/${id}`
    );

    const alerta = await this.alertController.create({
      header: 'Documento eliminado',
      message: 'El documento fue eliminado correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.cargarDocumentos();
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
}
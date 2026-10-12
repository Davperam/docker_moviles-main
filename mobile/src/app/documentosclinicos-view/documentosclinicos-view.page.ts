import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

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
  selector: 'app-documentosclinicos-view',
  templateUrl: './documentosclinicos-view.page.html',
  styleUrls: ['./documentosclinicos-view.page.scss'],
  standalone: false,
})
export class DocumentosclinicosViewPage implements OnInit {

  documento: DocumentoClinico | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarDocumento();
  }
  async cargarDocumento(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.documento = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del documento clínico.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando documento clínico...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: DocumentoClinico }>(
        `${environment.apiUrl}/items/documentoclinico/${encodeURIComponent(id)}`
      );
      this.documento = response.data.data;
    } catch (error) {
      console.error('Error al cargar el documento clínico:', error);
      this.mensajeError = 'Ocurrió un error al cargar el documento clínico.';
    } finally {
      loading.dismiss();
    }
  }

}

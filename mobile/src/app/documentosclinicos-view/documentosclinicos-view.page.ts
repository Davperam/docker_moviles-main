import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { DocumentosclinicosService } from '../services/documentosclinicos';

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
    private loadingController: LoadingController,
    private documentosService: DocumentosclinicosService
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
      this.documento = await firstValueFrom(
        this.documentosService.detalle(Number(id))
      );
    } catch (error) {
      console.error('Error al cargar el documento clínico:', error);
      this.mensajeError = 'Ocurrió un error al cargar el documento clínico.';
    } finally {
      await loading.dismiss();
    }
  }
}
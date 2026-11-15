import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { NotaclinicaService } from '../services/notaclinica';

interface NotaClinica {
  idnota: number;
  idexpediente: number;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

@Component({
  selector: 'app-notaclinica-view',
  templateUrl: './notaclinica-view.page.html',
  styleUrls: ['./notaclinica-view.page.scss'],
  standalone: false,
})
export class NotaclinicaViewPage implements OnInit {

  nota: NotaClinica | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private notaclinicaService: NotaclinicaService
  ) {}

  ngOnInit(): void {
    this.cargarNota();
  }

  async cargarNota(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.nota = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID de la nota clínica.';
      return;
    }

    const loading = await this.loading.create({
      message: 'Cargando nota...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      this.nota = await firstValueFrom(
        this.notaclinicaService.detalle(Number(id))
      );
    } catch (error) {
      console.error('Error al cargar la nota:', error);
      this.mensajeError = 'No se pudo cargar la nota. Revisa el ID, la conexión y los permisos de lectura.';
    } finally {
      await loading.dismiss();
    }
  }
}
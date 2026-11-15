import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ServiciosService } from '../services/servicios';

interface Servicio {
  idservicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string | number;
  activo?: number;
}

@Component({
  selector: 'app-servicios-view',
  templateUrl: './servicios-view.page.html',
  styleUrls: ['./servicios-view.page.scss'],
  standalone: false,
})
export class ServiciosViewPage implements OnInit {

  servicio: Servicio | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private serviciosService: ServiciosService
  ) { }

  ngOnInit() {
    this.cargarServicio();
  }

  async cargarServicio(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.servicio = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del servicio.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando servicio...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      this.servicio = await firstValueFrom(
        this.serviciosService.detalle(Number(id))
      );
    } catch (error) {
      console.error('Error al cargar el servicio:', error);
      this.mensajeError = 'Ocurrió un error al cargar el servicio.';
    } finally {
      await loading.dismiss();
    }
  }
}
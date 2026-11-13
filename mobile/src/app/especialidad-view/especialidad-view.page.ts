import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { EspecialidadService } from '../services/especialidad';

interface Especialidad {
  idespecialidad: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-especialidad-view',
  templateUrl: './especialidad-view.page.html',
  styleUrls: ['./especialidad-view.page.scss'],
  standalone: false,
})
export class EspecialidadViewPage implements OnInit {

  especialidad: Especialidad | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private especialidadesService: EspecialidadService
  ) { }

  ngOnInit() {
    this.cargarEspecialidad();
  }

  async cargarEspecialidad(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.especialidad = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID de la especialidad.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando especialidad...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      this.especialidad = await firstValueFrom(
        this.especialidadesService.detalle(Number(id))
      );
    } catch (error) {
      console.error('Error al cargar la especialidad:', error);
      this.mensajeError = 'Ocurrió un error al cargar la especialidad.';
    } finally {
      await loading.dismiss();
    }
  }
}
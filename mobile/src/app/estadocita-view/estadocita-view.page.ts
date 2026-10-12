import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface EstadoCita {
  idestadocita: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-estadocita-view',
  templateUrl: './estadocita-view.page.html',
  styleUrls: ['./estadocita-view.page.scss'],
  standalone: false,
})
export class EstadocitaViewPage implements OnInit {

  estadocita: EstadoCita | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarEstadoCita();
  }
  async cargarEstadoCita(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.estadocita = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del estado de cita.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando estado de cita...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: EstadoCita }>(
        `${environment.apiUrl}/items/estadocita/${encodeURIComponent(id)}`
      );
      this.estadocita = response.data.data;
    } catch (error) {
      console.error('Error al cargar el estado de cita:', error);
      this.mensajeError = 'Ocurrió un error al cargar el estado de cita.';
    } finally {
      loading.dismiss();
    }
  }

}

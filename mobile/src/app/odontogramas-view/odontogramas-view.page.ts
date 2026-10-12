import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Odontograma {
  idodontograma: number;
  idexpediente: number;
  fecharegistro: string;
  observaciones: string;
  diente: string;
  estado: string;
  tratamiento: string;
}

@Component({
  selector: 'app-odontogramas-view',
  templateUrl: './odontogramas-view.page.html',
  styleUrls: ['./odontogramas-view.page.scss'],
  standalone: false,
})
export class OdontogramasViewPage implements OnInit {

  odontograma: Odontograma | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarOdontograma();
  }
  async cargarOdontograma(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.odontograma = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del odontograma.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando odontograma...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: Odontograma }>(
        `${environment.apiUrl}/items/odontograma/${encodeURIComponent(id)}`
      );
      this.odontograma = response.data.data;
    } catch (error) {
      console.error('Error al cargar el odontograma:', error);
      this.mensajeError = 'Ocurrió un error al cargar el odontograma.';
    } finally {
      loading.dismiss();
    }
  }

}

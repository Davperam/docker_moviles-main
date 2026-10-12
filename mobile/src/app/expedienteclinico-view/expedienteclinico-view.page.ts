import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface ExpedienteClinico {
  idexpediente: number;
  idpaciente: number;
  enfermedades: string;
  observaciones: string;
  apertura: string;
}

@Component({
  selector: 'app-expedienteclinico-view',
  templateUrl: './expedienteclinico-view.page.html',
  styleUrls: ['./expedienteclinico-view.page.scss'],
  standalone: false,
})
export class ExpedienteclinicoViewPage implements OnInit {

  expediente: ExpedienteClinico | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarExpediente();
  }
  async cargarExpediente(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.expediente = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del expediente clínico.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando expediente clínico...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: ExpedienteClinico }>(
        `${environment.apiUrl}/items/expedienteclinico/${encodeURIComponent(id)}`
      );
      this.expediente = response.data.data;
    } catch (error) {
      console.error('Error al cargar el expediente clínico:', error);
      this.mensajeError = 'Ocurrió un error al cargar el expediente clínico.';
    } finally {
      loading.dismiss();
    }
  }

}

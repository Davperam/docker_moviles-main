import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface ExpedienteAlergia {
  idexpedientealergia: number;
  idalergia: number;
  idexpediente: number;
}

@Component({
  selector: 'app-expedientealergia-view',
  templateUrl: './expedientealergia-view.page.html',
  styleUrls: ['./expedientealergia-view.page.scss'],
  standalone: false,
})
export class ExpedientealergiaViewPage implements OnInit {

  expedienteAlergia: ExpedienteAlergia | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarExpedienteAlergia();
  }
  async cargarExpedienteAlergia(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.expedienteAlergia = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del expediente de alergia.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando expediente de alergia...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: ExpedienteAlergia }>(
        `${environment.apiUrl}/items/expedientealergia/${encodeURIComponent(id)}`
      );
      this.expedienteAlergia = response.data.data;
    } catch (error) {
      console.error('Error al cargar el expediente de alergia:', error);
      this.mensajeError = 'Ocurrió un error al cargar el expediente de alergia.';
    } finally {
      loading.dismiss();
    }
  }

}

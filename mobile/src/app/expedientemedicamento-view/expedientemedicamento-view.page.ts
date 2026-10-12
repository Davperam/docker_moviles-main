import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface ExpedienteMedicamento {
  idexpedientemedicamento: number;
  idexpediente: number;
  idmedicamento: number;
}

@Component({
  selector: 'app-expedientemedicamento-view',
  templateUrl: './expedientemedicamento-view.page.html',
  styleUrls: ['./expedientemedicamento-view.page.scss'],
  standalone: false,
})
export class ExpedientemedicamentoViewPage implements OnInit {

  expedientemedicamento: ExpedienteMedicamento | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarExpedienteMedicamento();
  }
  async cargarExpedienteMedicamento(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.expedientemedicamento = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del expediente de medicamento.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando expediente de medicamento...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: ExpedienteMedicamento }>(
        `${environment.apiUrl}/items/expedientemedicamento/${encodeURIComponent(id)}`
      );
      this.expedientemedicamento = response.data.data;
    } catch (error) {
      console.error('Error al cargar el expediente de medicamento:', error);
      this.mensajeError = 'Ocurrió un error al cargar el expediente de medicamento.';
    } finally {
      loading.dismiss();
    }
  }

}

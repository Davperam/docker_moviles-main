import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Pago {
  idpago: number;
  idcita: number;
  idmetodopago: number;
  total: number;
  fechapago: string;
  estado: number;
  observaciones: string;
}

@Component({
  selector: 'app-pagos-view',
  templateUrl: './pagos-view.page.html',
  styleUrls: ['./pagos-view.page.scss'],
  standalone: false,
})
export class PagosViewPage implements OnInit {

  pago: Pago | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.cargarPago();
  }
  async cargarPago(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.pago = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del pago.';
      return;
    }

    const loading = await this.loading.create({
      message: 'Cargando pago...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: Pago }>(
        `${environment.apiUrl}/items/pago/${encodeURIComponent(id)}`
      );
      this.pago = response.data.data;
    } catch (error) {
      console.error('Error al cargar el pago:', error);
      this.mensajeError = 'Ocurrió un error al cargar el pago.';
    } finally {
      loading.dismiss();
    }
  }

}

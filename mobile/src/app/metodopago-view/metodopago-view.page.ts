import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface MetodoPago {
  idmetodopago: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-metodopago-view',
  templateUrl: './metodopago-view.page.html',
  styleUrls: ['./metodopago-view.page.scss'],
  standalone: false,
})
export class MetodopagoViewPage implements OnInit {

  metodopago: MetodoPago | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarMetodoPago();
  }
  async cargarMetodoPago(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.metodopago = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del método de pago.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando método de pago...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: MetodoPago }>(
        `${environment.apiUrl}/items/metodopago/${encodeURIComponent(id)}`
      );
      this.metodopago = response.data.data;
    } catch (error) {
      console.error('Error al cargar el método de pago:', error);
      this.mensajeError = 'Ocurrió un error al cargar el método de pago.';
    } finally {
      loading.dismiss();
    }
  }

}

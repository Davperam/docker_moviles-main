import { Component } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

import { ModalController, AlertController } from '@ionic/angular';
import { PagosFormPage } from '../pagos-form/pagos-form.page';

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
  selector: 'app-pagos-list',
  templateUrl: './pagos-list.page.html',
  styleUrls: ['./pagos-list.page.scss'],
  standalone: false,
})
export class PagosListPage {
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = 'Pagos';

  pagos: Pago[] = [];

  constructor(
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter(): void {
    this.cargarDatos();
  }

  async cargarPagos(): Promise<void> {
    try {
      const response = await axios.get<{ data: Pago[] }>(
        `${environment.apiUrl}/items/pago`,
        {
        params: {
          limit: this.porPagina,
          page: this.paginaActual,
          sort: 'idpago',
        }
      }
      );
      this.pagos = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los pagos:', error);
    }
  }

  async nuevoPago(): Promise<void> {
  const modal = await this.modalController.create({
    component: PagosFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarPagos();
  }
}

/* Paginacion */

async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/pago?aggregate[count]=*`
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de pagos:',
      error
    );

    this.total = 0;
  }
}
private ajustarPaginaActual(): void {
  const totalPaginas = Math.ceil(
    this.total / this.porPagina
  );

  if (totalPaginas === 0) {
    this.paginaActual = 1;
    return;
  }

  if (this.paginaActual > totalPaginas) {
    this.paginaActual = totalPaginas;
  }
}
async cargarDatos(): Promise<void> {
  await this.cargarTotal();
  this.ajustarPaginaActual();
  await this.cargarPagos();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarPagos();
}

}

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

import { ModalController } from '@ionic/angular';
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
export class PagosListPage implements OnInit {

  pagos: Pago[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarPagos();
  }

  async cargarPagos(): Promise<void> {
    try {
      const response = await axios.get<{ data: Pago[] }>(
        `${environment.apiUrl}/items/pago`
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

}

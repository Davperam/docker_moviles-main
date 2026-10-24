import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

import { ModalController } from '@ionic/angular';
import { DentistasFormPage } from '../dentistas-form/dentistas-form.page';

interface Dentista {
  iddentista: number;
  nombre: string;
  paterno: string;
  materno: string;
  cedula: string;
  telefono: string;
  correo: string;
  activo: number;
}

@Component({
  selector: 'app-dentistas-list',
  templateUrl: './dentistas-list.page.html',
  styleUrls: ['./dentistas-list.page.scss'],
  standalone: false,
})
export class DentistasListPage implements OnInit {

  dentistas: Dentista[] = [];

  constructor(
     private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarDentistas();
  }

  async cargarDentistas(): Promise<void> {
    try {
      const response = await axios.get<{ data: Dentista[] }>(
        `${environment.apiUrl}/items/dentista`
      );
      this.dentistas = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los dentistas:', error);
    }
  }

  async nuevoDentista(): Promise<void> {
    const modal = await this.modalController.create({
      component: DentistasFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data?.guardado) {
      await this.cargarDentistas();
    }
  }

  async editarDentista(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: DentistasFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarDentistas();
  }
}

}

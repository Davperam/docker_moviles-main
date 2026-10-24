import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

import { ModalController } from '@ionic/angular';
import { ExpedienteclinicoFormPage } from '../expedienteclinico-form/expedienteclinico-form.page';

interface ExpedienteClinico {
  idexpediente: number;
  idpaciente: number;
  enfermedades: string;
  observaciones: string;
  apertura: string;
}

@Component({
  selector: 'app-expedienteclinico-list',
  templateUrl: './expedienteclinico-list.page.html',
  styleUrls: ['./expedienteclinico-list.page.scss'],
  standalone: false,
})
export class ExpedienteclinicoListPage implements OnInit {

  expedientes: ExpedienteClinico[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarExpedientes();
  }

  async cargarExpedientes(): Promise<void> {
    try {
      const response = await axios.get<{ data: ExpedienteClinico[] }>(
        `${environment.apiUrl}/items/expedienteclinico`
      );
      this.expedientes = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los expedientes clínicos:', error);
    }
  }


  async nuevoExpedienteclinico(): Promise<void> {
  const modal = await this.modalController.create({
    component: ExpedienteclinicoFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarExpedientes();
  }
}

}

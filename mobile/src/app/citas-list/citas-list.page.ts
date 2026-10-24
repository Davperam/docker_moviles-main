import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';
import { CitasFormPage } from '../citas-form/citas-form.page';

interface Cita {
  idcita: number;
  idpaciente: number;
  iddentista: number;
  idestadocita: number;
  fecha: string;
  horainicio: string;
  horafin: string;
  motivo: string;
  observaciones: string;
}

@Component({
  selector: 'app-citas-list',
  templateUrl: './citas-list.page.html',
  styleUrls: ['./citas-list.page.scss'],
  standalone: false,
})
export class CitasListPage implements OnInit {

  citas: Cita[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarCita();
  }

  async cargarCita(): Promise<void> {
    try {
      const response = await axios.get<{ data: Cita[] }>(
        `${environment.apiUrl}/items/cita`
      );
      this.citas = response.data.data; 
    } catch (error) {
      console.error('Error al cargar las citas:', error);
    }
  }

  async nuevaCita(): Promise<void> {
  const modal = await this.modalController.create({
    component: CitasFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });


  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarCita();
  }
}

async editarCita(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: CitasFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarCita();
  }
}

}

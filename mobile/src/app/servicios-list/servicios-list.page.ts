import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';
import { ServiciosFormPage } from '../servicios-form/servicios-form.page';

interface Servicio {
  idservicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
  activo: number;
}

@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.page.html',
  styleUrls: ['./servicios-list.page.scss'],
  standalone: false,
})
export class ServiciosListPage implements OnInit {

  servicios: Servicio[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarServicios();
  }

  async cargarServicios(): Promise<void> {
    try {
      const response = await axios.get<{ data: Servicio[] }>(
        `${environment.apiUrl}/items/servicio`
      );
      this.servicios = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los servicios:', error);
    }
  }

  async nuevoServicio(): Promise<void> {
  const modal = await this.modalController.create({
    component: ServiciosFormPage,
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarServicios();
  }
}

}

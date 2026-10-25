import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { ModalController } from '@ionic/angular';
import { PacientesFormPage } from '../pacientes-form/pacientes-form.page';

interface Paciente {
  idpaciente: number;
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: string;
  telefono: string;
  correo: string;
  direccion: string;
  registro: string;
  activo: number;
}

@Component({
  selector: 'app-pacientes-list',
  templateUrl: './pacientes-list.page.html',
  styleUrls: ['./pacientes-list.page.scss'],
  standalone: false,
})
export class PacientesListPage implements OnInit {

  pacientes: Paciente[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.cargarPacientes();
  }

  async cargarPacientes(): Promise<void> {
    try {
      const response = await axios.get<{ data: Paciente[] }>(
        `${environment.apiUrl}/items/paciente`
      );
      this.pacientes = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los pacientes:', error);
    }
  }

  async nuevoPaciente(): Promise<void> {
    const modal = await this.modalController.create({
      component: PacientesFormPage,
      breakpoints: [0, 0.5, 0.95],
      initialBreakpoint: 0.95
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    
    if (data?.guardado) {
      await this.cargarPacientes();
    }
  }

  async editarPaciente(id: number): Promise<void> {
  const modal = await this.modalController.create({
    component: PacientesFormPage,
    componentProps: {
      id: id
    },
    breakpoints: [0, 0.5, 0.95],
    initialBreakpoint: 0.95
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();

  if (data?.guardado) {
    await this.cargarPacientes();
  }
}

}

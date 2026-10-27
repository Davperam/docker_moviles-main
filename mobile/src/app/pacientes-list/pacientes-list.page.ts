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
export class PacientesListPage {

  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = 'Pacientes';

  pacientes: Paciente[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ionViewWillEnter(): void {
    this.cargarDatos();
  }

  async cargarPacientes(): Promise<void> {
    try {
      const response = await axios.get<{ data: Paciente[] }>(
        `${environment.apiUrl}/items/paciente`,
        {
        params: {
          limit: this.porPagina,
          page: this.paginaActual,
          sort: 'idpaciente',
        }
      }
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

/* Paginación */
async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/paciente?aggregate[count]=*`
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de pacientes:',
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
  await this.cargarPacientes();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarPacientes();
}


}

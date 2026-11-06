import { Component } from '@angular/core';
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
export class ExpedienteclinicoListPage {
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 8;

  titulo: string = "Lista de Expedientes Clinicos";

  expedientes: ExpedienteClinico[] = [];

  constructor(
    private modalController: ModalController
  ) { }

  ionViewWillEnter(): void {
    void this.cargarDatos();
  }

  async cargarExpedientes(): Promise<void> {
    try {
      const response = await axios.get<{ data: ExpedienteClinico[] }>(
        `${environment.apiUrl}/items/expedienteclinico`,
        {
        params: {
          limit: this.porPagina,
          page: this.paginaActual,
          sort: 'idexpediente'
          }
        }
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

async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/expedienteclinico?aggregate[count]=*`
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de expedientes:',
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
  await this.cargarExpedientes();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarExpedientes();
}

}

import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Alergia {
  idalergia: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-alergia-list',
  templateUrl: './alergia-list.page.html',
  styleUrls: ['./alergia-list.page.scss'],
  standalone: false,
})
export class AlergiaListPage {
  total: number = 0;
  paginaActual: number = 1;
  porPagina: number = 3;

  titulo: string = 'Alergias';

  constructor(private alertController: AlertController) { }

  alergias: Alergia[] = [];

  ionViewWillEnter(): void {
    void this.cargarAlergia();
  }

  async cargarAlergia(): Promise<void> {
    try {
      const response = await axios.get<{ data: Alergia[] }>(
        `${environment.apiUrl}/items/alergia`,
        {
          params: {
            limit: this.porPagina,
            page: this.paginaActual,
            sort: 'idalergia'
          }
        }
      );

      this.alergias = response.data.data;

    } catch (error) {
      console.error('Error al cargar las alergias:', error);
    }
  }

  async cargarTotal(): Promise<void> {
  try {
    const response = await axios.get<{ data: { count: number | string }[] }>(
      `${environment.apiUrl}/items/alergia?aggregate[count]=*`
    );

    this.total = Number(
      response.data.data[0]?.count ?? 0
    );

  } catch (error) {
    console.error(
      'Error al obtener el total de alergias:',
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
  await this.cargarAlergia();
}
async cambiarPagina(
  pagina: number
): Promise<void> {
  this.paginaActual = pagina;
  await this.cargarAlergia();
}

}

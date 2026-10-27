import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface NotaClinica {
  idnota: number;
  idexpediente: number;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

@Component({
  selector: 'app-notaclinica-list',
  templateUrl: './notaclinica-list.page.html',
  styleUrls: ['./notaclinica-list.page.scss'],
  standalone: false,
})
export class NotaclinicaListPage {
  titulo: string = 'Notas clínicas';

  notas: NotaClinica[] = [];

  constructor() { }

ionViewWillEnter(): void {
    this.cargarNotas();
  }
  async cargarNotas(): Promise<void> {
    try {
      const response = await axios.get<{ data: NotaClinica[] }>(
        `${environment.apiUrl}/items/notaclinica`
      );
      this.notas = response.data.data; 
    } catch (error) {
      console.error('Error al cargar las notas clínicas:', error);
    }
  }

}

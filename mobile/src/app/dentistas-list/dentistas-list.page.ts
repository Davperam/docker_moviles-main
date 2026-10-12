import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

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

  constructor() { }

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

}

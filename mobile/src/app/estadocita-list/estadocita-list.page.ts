import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface EstadoCita {
  idestadocita: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-estadocita-list',
  templateUrl: './estadocita-list.page.html',
  styleUrls: ['./estadocita-list.page.scss'],
  standalone: false,
})

export class EstadocitaListPage implements OnInit {

  estadocitas: EstadoCita[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarEstadoCita();
  }

  async cargarEstadoCita(): Promise<void> {
    try {
      const response = await axios.get<{ data: EstadoCita[] }>(
        `${environment.apiUrl}/items/estadocita`
      );
      this.estadocitas = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los estados de cita:', error);
    }
  }

}

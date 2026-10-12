import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

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

  constructor() { }

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

}

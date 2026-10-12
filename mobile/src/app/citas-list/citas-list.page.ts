import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

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

  constructor() { }

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

}

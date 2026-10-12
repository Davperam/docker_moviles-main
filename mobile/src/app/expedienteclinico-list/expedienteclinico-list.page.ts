import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

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
export class ExpedienteclinicoListPage implements OnInit {

  expedientes: ExpedienteClinico[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarExpedientes();
  }

  async cargarExpedientes(): Promise<void> {
    try {
      const response = await axios.get<{ data: ExpedienteClinico[] }>(
        `${environment.apiUrl}/items/expedienteclinico`
      );
      this.expedientes = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los expedientes clínicos:', error);
    }
  }

}

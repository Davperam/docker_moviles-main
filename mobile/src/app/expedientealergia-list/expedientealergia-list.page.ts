import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface ExpedienteAlergia {
  idexpedientealergia: number;
  idalergia: number;
  idexpediente: number;
}

@Component({
  selector: 'app-expedientealergia-list',
  templateUrl: './expedientealergia-list.page.html',
  styleUrls: ['./expedientealergia-list.page.scss'],
  standalone: false,
})
export class ExpedientealergiaListPage implements OnInit {

  expedienteAlergias : ExpedienteAlergia[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarExpedienteAlergia();
  }
  async cargarExpedienteAlergia(): Promise<void> {
    try {
      const response = await axios.get<{ data: ExpedienteAlergia[] }>(
        `${environment.apiUrl}/items/expedientealergia`
      );
      this.expedienteAlergias = response.data.data;
    } catch (error) {
      console.error('Error al cargar los expedientes de alergia:', error);
    }
  }

}

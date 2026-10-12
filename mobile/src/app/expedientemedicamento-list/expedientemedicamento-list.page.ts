import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface ExpedienteMedicamento {
  idexpedientemedicamento: number;
  idexpediente: number;
  idmedicamento: number;
}
  
@Component({
  selector: 'app-expedientemedicamento-list',
  templateUrl: './expedientemedicamento-list.page.html',
  styleUrls: ['./expedientemedicamento-list.page.scss'],
  standalone: false,
})
export class ExpedientemedicamentoListPage implements OnInit {

  expedientemedicamentos: ExpedienteMedicamento[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarExpedienteMedicamento();
  }

  async cargarExpedienteMedicamento(): Promise<void> {
    try {
      const response = await axios.get<{ data: ExpedienteMedicamento[] }>(
        `${environment.apiUrl}/items/expedientemedicamento`
      );
      this.expedientemedicamentos = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los expedientes de medicamentos:', error);
    }
  }

}

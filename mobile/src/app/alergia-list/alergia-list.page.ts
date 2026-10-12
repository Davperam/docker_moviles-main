import { Component, OnInit } from '@angular/core';
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
export class AlergiaListPage implements OnInit {

  alergias: Alergia[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarAlergia();
  }

  async cargarAlergia(): Promise<void> {
    try {
      const response = await axios.get<{ data: Alergia[] }>(
        `${environment.apiUrl}/items/alergia`
      );
      this.alergias = response.data.data;
    } catch (error) {
      console.error('Error al cargar las alergias:', error);
    }
  }

}

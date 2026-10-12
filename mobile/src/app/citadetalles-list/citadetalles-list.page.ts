import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Citadetalle {
  iddetallecita: number;
  idcita: number;
  idservicio: number;
  cantidad: number;
  precio: number;
  observaciones: string;
}

@Component({
  selector: 'app-citadetalles-list',
  templateUrl: './citadetalles-list.page.html',
  styleUrls: ['./citadetalles-list.page.scss'],
  standalone: false,
})
export class CitadetallesListPage implements OnInit {

  citadetalles: Citadetalle[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarCitadetalle();
  }

  async cargarCitadetalle(): Promise<void> {
    try {
      const response = await axios.get<{ data: Citadetalle[] }>(
        `${environment.apiUrl}/items/citadetalle`
      );
      this.citadetalles = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los detalles de las citas:', error);
    }
  } 

}

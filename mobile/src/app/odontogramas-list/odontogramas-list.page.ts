import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Odontograma {
  idodontograma: number;
  idexpediente: number;
  fecharegistro: string;
  observaciones: string;
  diente: string;
  estado: string;
  tratamiento: string;
}

@Component({
  selector: 'app-odontogramas-list',
  templateUrl: './odontogramas-list.page.html',
  styleUrls: ['./odontogramas-list.page.scss'],
  standalone: false,
})
export class OdontogramasListPage implements OnInit {

  odontogramas: Odontograma[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarOdontogramas();
  }

  async cargarOdontogramas(): Promise<void> {
    try {
      const response = await axios.get<{ data: Odontograma[] }>(
        `${environment.apiUrl}/items/odontograma`
      );
      this.odontogramas = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los odontogramas:', error);
    }
  } 

}

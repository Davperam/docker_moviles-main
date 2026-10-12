import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface MetodoPago {
  idmetodopago: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-metodopago-list',
  templateUrl: './metodopago-list.page.html',
  styleUrls: ['./metodopago-list.page.scss'],
  standalone: false,
})
export class MetodopagoListPage implements OnInit {

  metodosPago: MetodoPago[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarMetodosPago();
  }

  async cargarMetodosPago(): Promise<void> {
    try {
      const response = await axios.get<{ data: MetodoPago[] }>(
        `${environment.apiUrl}/items/metodopago`
      );
      this.metodosPago = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los métodos de pago:', error);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Medicamento {
  idmedicamento: number;
  nombre: string;
  descripcion: string;
  activo: number
}

@Component({
  selector: 'app-medicamentos-list',
  templateUrl: './medicamentos-list.page.html',
  styleUrls: ['./medicamentos-list.page.scss'],
  standalone: false,
})
export class MedicamentosListPage implements OnInit {

  medicamentos: Medicamento[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarMedicamentos();
  }

  async cargarMedicamentos(): Promise<void> {
    try {
      const response = await axios.get<{ data: Medicamento[] }>(
        `${environment.apiUrl}/items/medicamento`
      );
      this.medicamentos = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los medicamentos:', error);
    }
  }

}

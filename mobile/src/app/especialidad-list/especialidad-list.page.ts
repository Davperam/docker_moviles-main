import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Especialidad {
  idespecialidad: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.page.html',
  styleUrls: ['./especialidad-list.page.scss'],
  standalone: false,
})
export class EspecialidadListPage implements OnInit {

  especialidades: Especialidad[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarEspecialidades();
  }

  async cargarEspecialidades(): Promise<void> {
    try {
      const response = await axios.get<{ data: Especialidad[] }>(
        `${environment.apiUrl}/items/especialidad`
      );
      this.especialidades = response.data.data; 
    } catch (error) {
      console.error('Error al cargar las especialidades:', error);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Dentistaespecialidad {
  iddentistaespecialidad: number;
  idespecialidad: number;
  iddentista: number;
}

@Component({
  selector: 'app-dentistaespecialidad-list',
  templateUrl: './dentistaespecialidad-list.page.html',
  styleUrls: ['./dentistaespecialidad-list.page.scss'],
  standalone: false,
})
export class DentistaespecialidadListPage implements OnInit {
  titulo: string = ' Especialidades Dentistas';

  dentistaespecialidad: Dentistaespecialidad[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarDentistaespecialidad();
  }

  async cargarDentistaespecialidad(): Promise<void> {
    try {
      const response = await axios.get<{ data: Dentistaespecialidad[] }>(
        `${environment.apiUrl}/items/dentistaespecialidad`
      );
      this.dentistaespecialidad = response.data.data; 
    } catch (error) {
      console.error('Error al cargar las dentistaespecialidades:', error);
    }
  }

}

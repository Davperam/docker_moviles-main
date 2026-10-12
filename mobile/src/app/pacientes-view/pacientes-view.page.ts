import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Paciente {
  idpaciente: number;
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: string;
  telefono: string;
  correo: string;
  direccion: string;
  registro: string;
  activo: number;
}

@Component({
  selector: 'app-pacientes-view',
  templateUrl: './pacientes-view.page.html',
  styleUrls: ['./pacientes-view.page.scss'],
  standalone: false,
})
export class PacientesViewPage implements OnInit {

  paciente: Paciente | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarPaciente();
  }
  async cargarPaciente(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.paciente = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del paciente.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando paciente...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: Paciente }>(
        `${environment.apiUrl}/items/paciente/${encodeURIComponent(id)}`
      );
      this.paciente = response.data.data;
    } catch (error) {
      console.error('Error al cargar el paciente:', error);
      this.mensajeError = 'Ocurrió un error al cargar el paciente.';
    } finally {
      loading.dismiss();
    }
  }

}

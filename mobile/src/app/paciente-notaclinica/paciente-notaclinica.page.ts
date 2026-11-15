import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { PacientesService, Paciente } from '../services/pacientes';

export interface NotaClinicaItem {
  idnota: number;
  idexpediente: number | any;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

@Component({
  selector: 'app-paciente-notaclinica',
  templateUrl: './paciente-notaclinica.page.html',
  styleUrls: ['./paciente-notaclinica.page.scss'],
  standalone: false,
})
export class PacienteNotaclinicaPage implements OnInit {
  idPaciente: number = 0;
  paciente: Paciente | null = null;
  notas: NotaClinicaItem[] = [];
  cargando: boolean = true;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private pacientesService: PacientesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idPaciente = Number(id);
      this.cargarDatos();
    } else {
      this.mensajeError = 'No se proporcionó el identificador del paciente.';
      this.cargando = false;
    }
  }

  async cargarDatos(): Promise<void> {
    const loading = await this.loadingController.create({
      message: 'Cargando notas clínicas...',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      // 1. Cargar paciente
      try {
        this.paciente = await firstValueFrom(this.pacientesService.detalle(this.idPaciente));
      } catch (e) {
        console.warn('No se pudo cargar el paciente:', e);
      }

      // 2. Obtener expedientes del paciente
      let expedienteIds: number[] = [];
      try {
        const resExp = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/expedienteclinico`, {
          params: {
            filter: JSON.stringify({ idpaciente: { _eq: this.idPaciente } }),
            limit: -1
          }
        });
        if (resExp.data?.data && resExp.data.data.length > 0) {
          expedienteIds = resExp.data.data.map(exp => Number(exp.idexpediente));
        }
      } catch (e) {
        console.warn('Filtro directo de expediente falló:', e);
      }

      if (expedienteIds.length === 0) {
        try {
          const resAllExp = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/expedienteclinico`, {
            params: { limit: -1 }
          });
          if (resAllExp.data?.data) {
            expedienteIds = resAllExp.data.data
              .filter(exp => {
                const pid = typeof exp.idpaciente === 'object' && exp.idpaciente !== null
                  ? (exp.idpaciente.idpaciente ?? exp.idpaciente.id)
                  : Number(exp.idpaciente);
                return pid === this.idPaciente;
              })
              .map(exp => Number(exp.idexpediente));
          }
        } catch (e) {
          console.error('Error al obtener lista de expedientes:', e);
        }
      }

      if (expedienteIds.length === 0) {
        this.notas = [];
        return;
      }

      // 3. Cargar notas clínicas de esos expedientes
      let listaNotas: NotaClinicaItem[] = [];
      try {
        const resNotas = await axios.get<{ data: NotaClinicaItem[] }>(`${environment.apiUrl}/items/notaclinica`, {
          params: {
            filter: JSON.stringify({ idexpediente: { _in: expedienteIds } }),
            sort: '-fecha,-idnota',
            limit: -1
          }
        });
        listaNotas = resNotas.data.data || [];
      } catch (e) {
        console.warn('Filtro directo de notaclinica falló:', e);
      }

      if (!listaNotas || listaNotas.length === 0) {
        try {
          const resAll = await axios.get<{ data: NotaClinicaItem[] }>(`${environment.apiUrl}/items/notaclinica`, {
            params: { limit: -1 }
          });
          if (resAll.data?.data) {
            listaNotas = resAll.data.data.filter(n => {
              const eid = typeof n.idexpediente === 'object' && n.idexpediente !== null
                ? (n.idexpediente.idexpediente ?? n.idexpediente.id)
                : Number(n.idexpediente);
              return expedienteIds.includes(eid);
            });
          }
        } catch (e) {
          console.error('Error al cargar lista general de notas:', e);
        }
      }

      // Ordenar por fecha (más reciente primero)
      listaNotas.sort((a, b) => (b.fecha || '').localeCompare(a.fecha || ''));
      this.notas = listaNotas;

    } catch (error) {
      console.error('Error al cargar notas clínicas:', error);
      this.mensajeError = 'Ocurrió un error al cargar las notas clínicas del paciente.';
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }
}
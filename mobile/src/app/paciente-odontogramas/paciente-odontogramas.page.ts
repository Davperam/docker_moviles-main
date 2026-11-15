import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { PacientesService, Paciente } from '../services/pacientes';

export interface OdontogramaItem {
  idodontograma: number;
  idexpediente: number | any;
  fecharegistro: string;
  observaciones: string;
  diente: string | number;
  estado: string;
  tratamiento: string;
}

@Component({
  selector: 'app-paciente-odontogramas',
  templateUrl: './paciente-odontogramas.page.html',
  styleUrls: ['./paciente-odontogramas.page.scss'],
  standalone: false,
})
export class PacienteOdontogramasPage implements OnInit {
  idPaciente: number = 0;
  paciente: Paciente | null = null;
  odontogramas: OdontogramaItem[] = [];
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
      message: 'Cargando odontogramas...',
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

      // Respaldo
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
        this.odontogramas = [];
        return;
      }

      // 3. Cargar odontogramas vinculados a esos expedientes
      let listaOdontogramas: OdontogramaItem[] = [];
      try {
        const resOdon = await axios.get<{ data: OdontogramaItem[] }>(`${environment.apiUrl}/items/odontograma`, {
          params: {
            filter: JSON.stringify({ idexpediente: { _in: expedienteIds } }),
            sort: '-fecharegistro,-idodontograma',
            limit: -1
          }
        });
        listaOdontogramas = resOdon.data.data || [];
      } catch (e) {
        console.warn('Filtro directo de odontogramas falló:', e);
      }

      if (!listaOdontogramas || listaOdontogramas.length === 0) {
        try {
          const resAllOdon = await axios.get<{ data: OdontogramaItem[] }>(`${environment.apiUrl}/items/odontograma`, {
            params: { limit: -1 }
          });
          if (resAllOdon.data?.data) {
            listaOdontogramas = resAllOdon.data.data.filter(o => {
              const eid = typeof o.idexpediente === 'object' && o.idexpediente !== null
                ? (o.idexpediente.idexpediente ?? o.idexpediente.id)
                : Number(o.idexpediente);
              return expedienteIds.includes(eid);
            });
          }
        } catch (e) {
          console.error('Error al cargar lista general de odontogramas:', e);
        }
      }

      // Ordenar por fecha de registro
      listaOdontogramas.sort((a, b) => (b.fecharegistro || '').localeCompare(a.fecharegistro || ''));
      this.odontogramas = listaOdontogramas;

    } catch (error) {
      console.error('Error al cargar odontogramas:', error);
      this.mensajeError = 'Ocurrió un error al cargar los odontogramas del paciente.';
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }

  getColorEstado(estado?: string): string {
    if (!estado) return 'medium';
    const lower = estado.toLowerCase();
    if (lower.includes('sano') || lower.includes('bueno')) return 'success';
    if (lower.includes('caries') || lower.includes('fractur') || lower.includes('ausente')) return 'danger';
    if (lower.includes('obturad') || lower.includes('tratad')) return 'warning';
    return 'primary';
  }
}
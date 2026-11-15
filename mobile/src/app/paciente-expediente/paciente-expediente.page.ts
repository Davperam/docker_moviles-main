import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { PacientesService, Paciente } from '../services/pacientes';

export interface ExpedienteClinicoItem {
  idexpediente: number;
  idpaciente: number | any;
  enfermedades: string;
  observaciones: string;
  apertura: string;
}

@Component({
  selector: 'app-paciente-expediente',
  templateUrl: './paciente-expediente.page.html',
  styleUrls: ['./paciente-expediente.page.scss'],
  standalone: false,
})
export class PacienteExpedientePage implements OnInit {
  idPaciente: number = 0;
  paciente: Paciente | null = null;
  expedientes: ExpedienteClinicoItem[] = [];
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
      message: 'Cargando expediente...',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      // 1. Cargar datos del paciente
      try {
        this.paciente = await firstValueFrom(this.pacientesService.detalle(this.idPaciente));
      } catch (e) {
        console.warn('No se pudo cargar el paciente:', e);
      }

      // 2. Cargar expediente(s) clínico(s) de este paciente
      let expList: ExpedienteClinicoItem[] = [];
      try {
        const res = await axios.get<{ data: ExpedienteClinicoItem[] }>(
          `${environment.apiUrl}/items/expedienteclinico`,
          {
            params: {
              filter: JSON.stringify({ idpaciente: { _eq: this.idPaciente } }),
              limit: -1
            }
          }
        );
        expList = res.data.data || [];
      } catch (err) {
        console.warn('Filtro directo de expediente falló, intentando lista general:', err);
      }

      // Respaldo de seguridad
      if (!expList || expList.length === 0) {
        try {
          const resAll = await axios.get<{ data: ExpedienteClinicoItem[] }>(
            `${environment.apiUrl}/items/expedienteclinico`,
            { params: { limit: -1 } }
          );
          if (resAll.data?.data) {
            expList = resAll.data.data.filter(exp => {
              const pid = typeof exp.idpaciente === 'object' && exp.idpaciente !== null
                ? (exp.idpaciente.idpaciente ?? exp.idpaciente.id)
                : Number(exp.idpaciente);
              return pid === this.idPaciente;
            });
          }
        } catch (e) {
          console.error('Error al obtener lista de expedientes:', e);
        }
      }

      this.expedientes = expList;

    } catch (error) {
      console.error('Error al cargar expediente del paciente:', error);
      this.mensajeError = 'Ocurrió un error al cargar el expediente clínico.';
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }
}
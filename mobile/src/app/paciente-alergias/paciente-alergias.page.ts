import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { PacientesService, Paciente } from '../services/pacientes';

export interface AlergiaPacienteItem {
  idexpedientealergia: number;
  idexpediente: number;
  idalergia: number;
  nombreAlergia: string;
  descripcionAlergia: string;
}

@Component({
  selector: 'app-paciente-alergias',
  templateUrl: './paciente-alergias.page.html',
  styleUrls: ['./paciente-alergias.page.scss'],
  standalone: false,
})
export class PacienteAlergiasPage implements OnInit {
  idPaciente: number = 0;
  paciente: Paciente | null = null;
  alergias: AlergiaPacienteItem[] = [];
  cargando: boolean = true;
  mensajeError: string = '';

  private catalogoAlergias: Map<number, { nombre: string; descripcion: string }> = new Map();

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
      message: 'Cargando alergias...',
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

      // 2. Cargar catálogo de alergias
      await this.cargarCatalogoAlergias();

      // 3. Obtener expedientes del paciente
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
        this.alergias = [];
        return;
      }

      // 4. Cargar alergias asociadas a esos expedientes
      let listaExpAlergias: any[] = [];
      try {
        const resEA = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/expedientealergia`, {
          params: {
            filter: JSON.stringify({ idexpediente: { _in: expedienteIds } }),
            limit: -1
          }
        });
        listaExpAlergias = resEA.data.data || [];
      } catch (e) {
        console.warn('Filtro directo de expedientealergia falló:', e);
      }

      if (!listaExpAlergias || listaExpAlergias.length === 0) {
        try {
          const resAll = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/expedientealergia`, {
            params: { limit: -1 }
          });
          if (resAll.data?.data) {
            listaExpAlergias = resAll.data.data.filter(ea => {
              const eid = typeof ea.idexpediente === 'object' && ea.idexpediente !== null
                ? (ea.idexpediente.idexpediente ?? ea.idexpediente.id)
                : Number(ea.idexpediente);
              return expedienteIds.includes(eid);
            });
          }
        } catch (e) {
          console.error('Error al obtener expedientealergias generales:', e);
        }
      }

      // 5. Vincular datos del catálogo
      this.alergias = listaExpAlergias.map(item => {
        const idAlergia = typeof item.idalergia === 'object' && item.idalergia !== null
          ? (item.idalergia.idalergia ?? item.idalergia.id)
          : Number(item.idalergia);

        const alergiaCat = this.catalogoAlergias.get(idAlergia);
        const nombreDirecto = typeof item.idalergia === 'object' ? item.idalergia.nombre : undefined;
        const descDirecta = typeof item.idalergia === 'object' ? item.idalergia.descripcion : undefined;

        return {
          idexpedientealergia: item.idexpedientealergia,
          idexpediente: item.idexpediente,
          idalergia: idAlergia,
          nombreAlergia: alergiaCat?.nombre || nombreDirecto || `Alergia #${idAlergia}`,
          descripcionAlergia: alergiaCat?.descripcion || descDirecta || 'Sin descripción registrada.'
        };
      });

    } catch (error) {
      console.error('Error al cargar alergias:', error);
      this.mensajeError = 'Ocurrió un error al cargar las alergias del paciente.';
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }

  private async cargarCatalogoAlergias(): Promise<void> {
    try {
      const res = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/alergia`, {
        params: { limit: -1 }
      });
      if (res.data?.data) {
        res.data.data.forEach(a => {
          const id = a.idalergia ?? a.id;
          this.catalogoAlergias.set(Number(id), {
            nombre: a.nombre,
            descripcion: a.descripcion
          });
        });
      }
    } catch (e) {
      console.warn('No se pudo cargar el catálogo de alergias:', e);
    }
  }
}
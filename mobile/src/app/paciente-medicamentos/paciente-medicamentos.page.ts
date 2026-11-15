import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { PacientesService, Paciente } from '../services/pacientes';

export interface MedicamentoPacienteItem {
  idexpedientemedicamento: number;
  idexpediente: number;
  idmedicamento: number;
  nombreMedicamento: string;
  descripcionMedicamento: string;
}

@Component({
  selector: 'app-paciente-medicamentos',
  templateUrl: './paciente-medicamentos.page.html',
  styleUrls: ['./paciente-medicamentos.page.scss'],
  standalone: false,
})
export class PacienteMedicamentosPage implements OnInit {
  idPaciente: number = 0;
  paciente: Paciente | null = null;
  medicamentos: MedicamentoPacienteItem[] = [];
  cargando: boolean = true;
  mensajeError: string = '';

  private catalogoMedicamentos: Map<number, { nombre: string; descripcion: string }> = new Map();

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
      message: 'Cargando medicamentos...',
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

      // 2. Cargar catálogo de medicamentos
      await this.cargarCatalogoMedicamentos();

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
        this.medicamentos = [];
        return;
      }

      // 4. Cargar expedientemedicamento de esos expedientes
      let listaExpMed: any[] = [];
      try {
        const resEM = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/expedientemedicamento`, {
          params: {
            filter: JSON.stringify({ idexpediente: { _in: expedienteIds } }),
            limit: -1
          }
        });
        listaExpMed = resEM.data.data || [];
      } catch (e) {
        console.warn('Filtro directo de expedientemedicamento falló:', e);
      }

      if (!listaExpMed || listaExpMed.length === 0) {
        try {
          const resAll = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/expedientemedicamento`, {
            params: { limit: -1 }
          });
          if (resAll.data?.data) {
            listaExpMed = resAll.data.data.filter(em => {
              const eid = typeof em.idexpediente === 'object' && em.idexpediente !== null
                ? (em.idexpediente.idexpediente ?? em.idexpediente.id)
                : Number(em.idexpediente);
              return expedienteIds.includes(eid);
            });
          }
        } catch (e) {
          console.error('Error al cargar lista general de expedientemedicamento:', e);
        }
      }

      // 5. Vincular datos del catálogo
      this.medicamentos = listaExpMed.map(item => {
        const idMed = typeof item.idmedicamento === 'object' && item.idmedicamento !== null
          ? (item.idmedicamento.idmedicamento ?? item.idmedicamento.id)
          : Number(item.idmedicamento);

        const medCat = this.catalogoMedicamentos.get(idMed);
        const nombreDirecto = typeof item.idmedicamento === 'object' ? item.idmedicamento.nombre : undefined;
        const descDirecta = typeof item.idmedicamento === 'object' ? item.idmedicamento.descripcion : undefined;

        return {
          idexpedientemedicamento: item.idexpedientemedicamento,
          idexpediente: item.idexpediente,
          idmedicamento: idMed,
          nombreMedicamento: medCat?.nombre || nombreDirecto || `Medicamento #${idMed}`,
          descripcionMedicamento: medCat?.descripcion || descDirecta || 'Sin indicaciones adicionales registradas.'
        };
      });

    } catch (error) {
      console.error('Error al cargar medicamentos:', error);
      this.mensajeError = 'Ocurrió un error al cargar los medicamentos del paciente.';
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }

  private async cargarCatalogoMedicamentos(): Promise<void> {
    try {
      const res = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/medicamento`, {
        params: { limit: -1 }
      });
      if (res.data?.data) {
        res.data.data.forEach(m => {
          const id = m.idmedicamento ?? m.id;
          this.catalogoMedicamentos.set(Number(id), {
            nombre: m.nombre,
            descripcion: m.descripcion
          });
        });
      }
    } catch (e) {
      console.warn('No se pudo cargar el catálogo de medicamentos:', e);
    }
  }
}
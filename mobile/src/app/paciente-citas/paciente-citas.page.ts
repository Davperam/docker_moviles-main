import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { PacientesService, Paciente } from '../services/pacientes';

export interface CitaItem {
  idcita: number;
  idpaciente: number | any;
  iddentista: number | any;
  idestadocita: number | any;
  fecha: string;
  horainicio: string;
  horafin: string;
  motivo: string;
  observaciones: string;
  nombreDentista?: string;
  nombreEstado?: string;
}

@Component({
  selector: 'app-paciente-citas',
  templateUrl: './paciente-citas.page.html',
  styleUrls: ['./paciente-citas.page.scss'],
  standalone: false,
})
export class PacienteCitasPage implements OnInit {
  idPaciente: number = 0;
  paciente: Paciente | null = null;
  citas: CitaItem[] = [];
  cargando: boolean = true;
  mensajeError: string = '';

  dentistasMap: Map<number, string> = new Map();
  estadosMap: Map<number, string> = new Map();

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
      message: 'Cargando citas...',
      spinner: 'bubbles',
    });
    await loading.present();

    try {
      // 1. Cargar datos del paciente
      try {
        this.paciente = await firstValueFrom(this.pacientesService.detalle(this.idPaciente));
      } catch (e) {
        console.warn('No se pudo cargar el detalle del paciente:', e);
      }

      // 2. Cargar catálogos de dentistas y estados para mostrar sus nombres
      await Promise.all([
        this.cargarCatalogoDentistas(),
        this.cargarCatalogoEstados()
      ]);

      // 3. Cargar citas asociadas a este paciente desde Directus
      let citasObtenidas: CitaItem[] = [];
      try {
        const res = await axios.get<{ data: CitaItem[] }>(`${environment.apiUrl}/items/cita`, {
          params: {
            filter: JSON.stringify({ idpaciente: { _eq: this.idPaciente } }),
            limit: -1
          }
        });
        citasObtenidas = res.data.data || [];
      } catch (err) {
        console.warn('Filtro directo de citas falló, intentando lista general:', err);
      }

      // Respaldo de seguridad si el filtro por objeto de Directus requiere filtrado manual
      if (!citasObtenidas || citasObtenidas.length === 0) {
        try {
          const resAll = await axios.get<{ data: CitaItem[] }>(`${environment.apiUrl}/items/cita`, {
            params: { limit: -1 }
          });
          if (resAll.data && resAll.data.data) {
            citasObtenidas = resAll.data.data.filter(c => {
              const pid = typeof c.idpaciente === 'object' && c.idpaciente !== null
                ? (c.idpaciente.idpaciente ?? c.idpaciente.id)
                : Number(c.idpaciente);
              return pid === this.idPaciente;
            });
          }
        } catch (e) {
          console.error('Error al obtener lista de citas:', e);
        }
      }

      // 4. ORDENAR: De la MÁS NUEVA a la ÚLTIMA (más reciente primero)
      citasObtenidas.sort((a, b) => {
        const timeA = new Date(`${a.fecha}T${a.horainicio || '00:00'}`).getTime();
        const timeB = new Date(`${b.fecha}T${b.horainicio || '00:00'}`).getTime();
        if (isNaN(timeA) || isNaN(timeB)) {
          return (b.fecha || '').localeCompare(a.fecha || '');
        }
        return timeB - timeA;
      });

      // 5. Vincular nombres legibles de dentista y estado
      this.citas = citasObtenidas.map(c => {
        const dentistaId = typeof c.iddentista === 'object' && c.iddentista !== null
          ? (c.iddentista.iddentista ?? c.iddentista.id)
          : Number(c.iddentista);

        const estadoId = typeof c.idestadocita === 'object' && c.idestadocita !== null
          ? (c.idestadocita.idestadocita ?? c.idestadocita.id)
          : Number(c.idestadocita);

        return {
          ...c,
          nombreDentista: this.dentistasMap.get(dentistaId) || (typeof c.iddentista === 'object' ? `${c.iddentista.nombre || ''} ${c.iddentista.paterno || ''}`.trim() : `Dentista #${dentistaId || ''}`),
          nombreEstado: this.estadosMap.get(estadoId) || (typeof c.idestadocita === 'object' ? c.idestadocita.nombre : `Estado #${estadoId || ''}`)
        };
      });

    } catch (error) {
      console.error('Error al cargar citas:', error);
      this.mensajeError = 'Ocurrió un error al cargar las citas del paciente.';
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }

  private async cargarCatalogoDentistas(): Promise<void> {
    try {
      const res = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/dentista`, {
        params: { limit: -1 }
      });
      if (res.data?.data) {
        res.data.data.forEach(d => {
          const id = d.iddentista ?? d.id;
          const nombreCompleto = `Dr(a). ${d.nombre || ''} ${d.paterno || ''} ${d.materno || ''}`.trim();
          this.dentistasMap.set(Number(id), nombreCompleto);
        });
      }
    } catch (e) {
      console.warn('No se pudo cargar el catálogo de dentistas:', e);
    }
  }

  private async cargarCatalogoEstados(): Promise<void> {
    try {
      const res = await axios.get<{ data: any[] }>(`${environment.apiUrl}/items/estadocita`, {
        params: { limit: -1 }
      });
      if (res.data?.data) {
        res.data.data.forEach(est => {
          const id = est.idestadocita ?? est.id;
          this.estadosMap.set(Number(id), est.nombre || est.descripcion || `Estado #${id}`);
        });
      }
    } catch (e) {
      console.warn('No se pudo cargar el catálogo de estados:', e);
    }
  }

  getColorEstado(estado?: string): string {
    if (!estado) return 'medium';
    const lower = estado.toLowerCase();
    if (lower.includes('confirm') || lower.includes('atendid') || lower.includes('complet')) return 'success';
    if (lower.includes('pend') || lower.includes('espera')) return 'warning';
    if (lower.includes('cancel') || lower.includes('no asist')) return 'danger';
    return 'primary';
  }
}
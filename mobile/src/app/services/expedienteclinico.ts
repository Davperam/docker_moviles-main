import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface Paciente {
  id?: number;
  idpaciente?: number;
  nombre: string;
  paterno: string;
  materno: string;
}

export interface ExpedienteClinico {
  idexpediente: number;
  idpaciente: number | any;
  enfermedades: string;
  observaciones: string;
  apertura: string;
  pacienteDetalle?: Paciente;
}

export interface ExpedienteClinicoGuardar {
  idpaciente: number;
  enfermedades: string;
  observaciones: string;
  apertura?: string;
}

@Injectable({ providedIn: 'root' })
export class ExpedienteclinicoService {
  private url = environment.apiUrl + '/items/expedienteclinico';
  private urlPacientes = environment.apiUrl + '/items/paciente';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { enfermedades: { _icontains: texto } },
      { observaciones: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<ExpedienteClinico[]> {
    return defer(() => axios.get<{ data: ExpedienteClinico[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idexpediente', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<ExpedienteClinico> {
    return defer(() => axios.get<{ data: ExpedienteClinico }>(`${this.url}/${id}`, {
      params: { fields: '*,idpaciente.*' }
    })).pipe(map(response => response.data.data));
  }

  // Catálogo de pacientes para el select del formulario
  pacientes(): Observable<Paciente[]> {
    return defer(() => axios.get<{ data: Paciente[] }>(this.urlPacientes, {
      params: {
        fields: 'idpaciente,nombre,paterno,materno',
        sort: 'nombre',
        limit: -1
      }
    })).pipe(map(response => response.data.data));
  }

  // Respaldo para obtener un solo paciente si no viene expandido
  paciente(id: number): Observable<Paciente> {
    return defer(() => axios.get<{ data: Paciente }>(`${this.urlPacientes}/${id}`))
      .pipe(map(response => response.data.data));
  }

  crear(expediente: ExpedienteClinicoGuardar): Observable<ExpedienteClinico> {
    return defer(() => axios.post<{ data: ExpedienteClinico }>(this.url, expediente))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, expediente: ExpedienteClinicoGuardar): Observable<ExpedienteClinico> {
    return defer(() => axios.patch<{ data: ExpedienteClinico }>(`${this.url}/${id}`, expediente))
      .pipe(map(response => response.data.data));
  }

  eliminar(id: number): Observable<void> {
    return defer(() => axios.delete(`${this.url}/${id}`)).pipe(map(() => undefined));
  }

  total(busqueda = ''): Observable<number> {
    return defer(() => axios.get<{ data: { count: string | number }[] }>(this.url, {
      params: { 'aggregate[count]': '*', ...this.filtro(busqueda) }
    })).pipe(map(response => Number(response.data.data[0]?.count ?? 0)));
  }
}
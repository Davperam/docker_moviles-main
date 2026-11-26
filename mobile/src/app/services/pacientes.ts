import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

export interface Paciente {
  idpaciente: number;
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: string | any;
  telefono: string;
  correo: string;
  direccion: string;
  registro: string;
  activo: number;
}

export interface PacienteGuardar {
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: number;
  telefono: string;
  correo: string;
  direccion: string;
  registro: string;
  activo: number;
}

@Injectable({ providedIn: 'root' })
export class PacientesService {
  constructor(private auth: AuthService) {}
  private url = environment.apiUrl + '/items/paciente';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombre: { _icontains: texto } },
      { paterno: { _icontains: texto } },
      { materno: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<Paciente[]> {
    return defer(() => this.auth.cliente.get<{ data: Paciente[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idpaciente', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Paciente> {
    return defer(() => this.auth.cliente.get<{ data: Paciente }>(`${this.url}/${id}`))
      .pipe(map(response => response.data.data));
  }

  crear(paciente: PacienteGuardar): Observable<Paciente> {
    return defer(() => this.auth.cliente.post<{ data: Paciente }>(this.url, paciente))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, paciente: PacienteGuardar): Observable<Paciente> {
    return defer(() => this.auth.cliente.patch<{ data: Paciente }>(`${this.url}/${id}`, paciente))
      .pipe(map(response => response.data.data));
  }

  eliminar(id: number): Observable<void> {
    return defer(() => this.auth.cliente.delete(`${this.url}/${id}`)).pipe(map(() => undefined));
  }

  total(busqueda = ''): Observable<number> {
    return defer(() => this.auth.cliente.get<{ data: { count: string | number }[] }>(this.url, {
      params: { 'aggregate[count]': '*', ...this.filtro(busqueda) }
    })).pipe(map(response => Number(response.data.data[0]?.count ?? 0)));
  }
}
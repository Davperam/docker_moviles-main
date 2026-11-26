import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

export interface Cita {
  idcita: number;
  idpaciente: number;
  iddentista: number;
  idestadocita: number;
  fecha: string;
  horainicio: string;
  horafin: string;
  motivo: string;
  observaciones: string;
}

export interface CitaGuardar {
  idpaciente: number;
  iddentista: number;
  idestadocita: number;
  fecha: string;
  horainicio: string;
  horafin: string;
  motivo: string;
  observaciones: string;
}

@Injectable({ providedIn: 'root' })
export class CitasService {
  constructor(private auth: AuthService) {}
  private url = environment.apiUrl + '/items/cita';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { motivo: { _icontains: texto } },
      { observaciones: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<Cita[]> {
    return defer(() => this.auth.cliente.get<{ data: Cita[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: '-idcita', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Cita> {
    return defer(() => this.auth.cliente.get<{ data: Cita }>(this.url + '/' + id))
      .pipe(map(response => response.data.data));
  }

  crear(cita: CitaGuardar): Observable<Cita> {
    return defer(() => this.auth.cliente.post<{ data: Cita }>(this.url, cita))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, cita: CitaGuardar): Observable<Cita> {
    return defer(() => this.auth.cliente.patch<{ data: Cita }>(this.url + '/' + id, cita))
      .pipe(map(response => response.data.data));
  }

  eliminar(id: number): Observable<void> {
    return defer(() => this.auth.cliente.delete(this.url + '/' + id)).pipe(map(() => undefined));
  }

  total(busqueda = ''): Observable<number> {
    return defer(() => this.auth.cliente.get<{ data: { count: string | number }[] }>(this.url, {
      params: { 'aggregate[count]': '*', ...this.filtro(busqueda) }
    })).pipe(map(response => Number(response.data.data[0]?.count ?? 0)));
  }
}
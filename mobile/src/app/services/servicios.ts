import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

export interface Servicio {
  idservicio: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string | number;
  activo?: number;
}

export interface ServicioGuardar {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
}

@Injectable({ providedIn: 'root' })
export class ServiciosService {
  constructor(private auth: AuthService) {}
  private url = environment.apiUrl + '/items/servicio';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombre: { _icontains: texto } },
      { descripcion: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<Servicio[]> {
    return defer(() => this.auth.cliente.get<{ data: Servicio[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idservicio', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Servicio> {
    return defer(() => this.auth.cliente.get<{ data: Servicio }>(`${this.url}/${id}`))
      .pipe(map(response => response.data.data));
  }

  crear(servicio: ServicioGuardar): Observable<Servicio> {
    return defer(() => this.auth.cliente.post<{ data: Servicio }>(this.url, servicio))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, servicio: ServicioGuardar): Observable<Servicio> {
    return defer(() => this.auth.cliente.patch<{ data: Servicio }>(`${this.url}/${id}`, servicio))
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
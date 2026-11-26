import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

export interface Especialidad {
  idespecialidad: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

export interface EspecialidadGuardar {
  nombre: string;
  descripcion: string;
  activo: number;
}

@Injectable({ providedIn: 'root' })
export class EspecialidadService {
  constructor(private auth: AuthService) {}
  private url = environment.apiUrl + '/items/especialidad';

  catalogo(): Observable<Especialidad[]> {
    return defer(() => this.auth.cliente.get<{ data: Especialidad[] }>(this.url, {
      params: {
        fields: 'idespecialidad,nombre',
        filter: JSON.stringify({ activo: { _eq: 1 } }),
        sort: 'nombre',
        limit: -1
      }
    })).pipe(map(response => response.data.data));
  }

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombre: { _icontains: texto } },
      { descripcion: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<Especialidad[]> {
    return defer(() => this.auth.cliente.get<{ data: Especialidad[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idespecialidad', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Especialidad> {
    return defer(() => this.auth.cliente.get<{ data: Especialidad }>(this.url + '/' + id))
      .pipe(map(response => response.data.data));
  }

  crear(especialidad: EspecialidadGuardar): Observable<Especialidad> {
    return defer(() => this.auth.cliente.post<{ data: Especialidad }>(this.url, especialidad))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, especialidad: EspecialidadGuardar): Observable<Especialidad> {
    return defer(() => this.auth.cliente.patch<{ data: Especialidad }>(this.url + '/' + id, especialidad))
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
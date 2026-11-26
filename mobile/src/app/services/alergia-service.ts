import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

export interface Alergia {
  idalergia: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

export interface AlergiaGuardar {
  nombre: string;
  descripcion: string;
}

@Injectable({ providedIn: 'root' })
export class AlergiasService {
  constructor(private auth: AuthService) {}
  private url = environment.apiUrl + '/items/alergia';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombre: { _icontains: texto } },
      { descripcion: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 3, busqueda = ''): Observable<Alergia[]> {
    return defer(() => this.auth.cliente.get<{ data: Alergia[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idalergia', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  /* para cargar todas las alergias activas en el selector sin afectar tu listado principal */
  catalogo(): Observable<Alergia[]> {
    return defer(() => this.auth.cliente.get<{ data: Alergia[] }>(this.url, {
      params: {
        fields: 'idalergia,nombre',
        filter: JSON.stringify({ activo: { _eq: 1 } }),
        sort: 'nombre',
        limit: -1
      }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Alergia> {
    return defer(() => this.auth.cliente.get<{ data: Alergia }>(this.url + '/' + id))
      .pipe(map(response => response.data.data));
  }

  crear(alergia: AlergiaGuardar): Observable<Alergia> {
    return defer(() => this.auth.cliente.post<{ data: Alergia }>(this.url, alergia))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, alergia: AlergiaGuardar): Observable<Alergia> {
    return defer(() => this.auth.cliente.patch<{ data: Alergia }>(this.url + '/' + id, alergia))
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
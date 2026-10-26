import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import axios from 'axios';
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
  activo: number;
}

@Injectable({ providedIn: 'root' })
export class AlergiasService {
  private url = environment.apiUrl + '/items/alergia';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombre: { _icontains: texto } },
      { descripcion: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 3, busqueda = ''): Observable<Alergia[]> {
    return defer(() => axios.get<{ data: Alergia[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idalergia', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Alergia> {
    return defer(() => axios.get<{ data: Alergia }>(this.url + '/' + id))
      .pipe(map(response => response.data.data));
  }

  crear(alergia: AlergiaGuardar): Observable<Alergia> {
    return defer(() => axios.post<{ data: Alergia }>(this.url, alergia))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, alergia: AlergiaGuardar): Observable<Alergia> {
    return defer(() => axios.patch<{ data: Alergia }>(this.url + '/' + id, alergia))
      .pipe(map(response => response.data.data));
  }

  eliminar(id: number): Observable<void> {
    return defer(() => axios.delete(this.url + '/' + id)).pipe(map(() => undefined));
  }

  total(busqueda = ''): Observable<number> {
    return defer(() => axios.get<{ data: { count: string | number }[] }>(this.url, {
      params: { 'aggregate[count]': '*', ...this.filtro(busqueda) }
    })).pipe(map(response => Number(response.data.data[0]?.count ?? 0)));
  }
}
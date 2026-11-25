import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface Dentista {
  iddentista: number;
  nombre: string;
  paterno: string;
  materno: string;
  cedula: string;
  telefono: string;
  correo: string;
  activo: number;
  especialidades?: {
    iddentistaespecialidad: number;
    idespecialidad: { idespecialidad: number; nombre: string };
  }[];
}

export interface DentistaGuardar {
  nombre: string;
  paterno: string;
  materno: string;
  cedula: string;
  telefono: string;
  correo: string;
  activo: number;
  especialidades?:
    | { idespecialidad: number }[]
    | { create: { idespecialidad: number }[]; delete: number[] };
}

@Injectable({ providedIn: 'root' })
export class DentistasService {
  private url = environment.apiUrl + '/items/dentista';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombre: { _icontains: texto } },
      { paterno: { _icontains: texto } },
      { materno: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<Dentista[]> {
    return defer(() => axios.get<{ data: Dentista[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'iddentista', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

    detalle(id: number): Observable<Dentista> {
    return defer(() => axios.get<{ data: Dentista }>(this.url + '/' + id, {
      params: {
        fields: '*,especialidades.iddentistaespecialidad,especialidades.idespecialidad.idespecialidad,especialidades.idespecialidad.nombre'
      }
    })).pipe(map(response => response.data.data));
  }

  crear(dentista: DentistaGuardar): Observable<Dentista> {
    return defer(() => axios.post<{ data: Dentista }>(this.url, dentista))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, dentista: DentistaGuardar): Observable<Dentista> {
    return defer(() => axios.patch<{ data: Dentista }>(this.url + '/' + id, dentista))
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
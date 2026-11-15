import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface NotaClinica {
  idnota: number;
  idexpediente: number;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

export interface NotaClinicaGuardar {
  idexpediente: number;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

export interface ExpedienteClinicoOpcion {
  idexpediente: number;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class NotaclinicaService {
  private url = environment.apiUrl + '/items/notaclinica';
  private urlExpedientes = environment.apiUrl + '/items/expedienteclinico';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { descripcion: { _icontains: texto } },
      { observaciones: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 5, busqueda = ''): Observable<NotaClinica[]> {
    return defer(() => axios.get<{ data: NotaClinica[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idnota', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<NotaClinica> {
    return defer(() => axios.get<{ data: NotaClinica }>(`${this.url}/${id}`))
      .pipe(map(response => response.data.data));
  }

  // Catálogo de expedientes para el select del formulario
  expedientes(): Observable<ExpedienteClinicoOpcion[]> {
    return defer(() => axios.get<{ data: ExpedienteClinicoOpcion[] }>(this.urlExpedientes))
      .pipe(map(response => response.data.data));
  }

  crear(nota: NotaClinicaGuardar): Observable<NotaClinica> {
    return defer(() => axios.post<{ data: NotaClinica }>(this.url, nota))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, nota: NotaClinicaGuardar): Observable<NotaClinica> {
    return defer(() => axios.patch<{ data: NotaClinica }>(`${this.url}/${id}`, nota))
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
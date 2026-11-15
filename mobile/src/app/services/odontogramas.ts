import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface Odontograma {
  idodontograma: number;
  idexpediente: number;
  fecharegistro: string;
  observaciones: string;
  diente: string;
  estado: string;
  tratamiento: string;
}

export interface OdontogramaGuardar {
  idexpediente: number;
  observaciones: string;
  diente: number;
  estado: string;
  tratamiento: string;
}

@Injectable({ providedIn: 'root' })
export class OdontogramasService {
  private url = environment.apiUrl + '/items/odontograma';
  private urlExpedientes = environment.apiUrl + '/items/expedienteclinico';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { estado: { _icontains: texto } },
      { tratamiento: { _icontains: texto } },
      { observaciones: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 5, busqueda = ''): Observable<Odontograma[]> {
    return defer(() => axios.get<{ data: Odontograma[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idodontograma', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Odontograma> {
    return defer(() => axios.get<{ data: Odontograma }>(`${this.url}/${id}`))
      .pipe(map(response => response.data.data));
  }

  // Trae los expedientes con los datos del paciente expandidos
  expedientes(): Observable<any[]> {
    return defer(() => axios.get<{ data: any[] }>(this.urlExpedientes, {
      params: {
        fields: 'idexpediente,idpaciente.*',
        limit: -1
      }
    })).pipe(map(response => response.data.data));
  }

  crear(odontograma: OdontogramaGuardar): Observable<Odontograma> {
    return defer(() => axios.post<{ data: Odontograma }>(this.url, odontograma))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, odontograma: OdontogramaGuardar): Observable<Odontograma> {
    return defer(() => axios.patch<{ data: Odontograma }>(`${this.url}/${id}`, odontograma))
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
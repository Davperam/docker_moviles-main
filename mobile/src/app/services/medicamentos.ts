import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';

export interface Medicamento {
  idmedicamento: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

export interface MedicamentoGuardar {
  nombre: string;
  descripcion: string;
  activo: number;
}

@Injectable({ providedIn: 'root' })
export class MedicamentosService {
  private url = environment.apiUrl + '/items/medicamento';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombre: { _icontains: texto } },
      { descripcion: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<Medicamento[]> {
    return defer(() => axios.get<{ data: Medicamento[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'idmedicamento', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<Medicamento> {
    return defer(() => axios.get<{ data: Medicamento }>(`${this.url}/${id}`))
      .pipe(map(response => response.data.data));
  }

  crear(medicamento: MedicamentoGuardar): Observable<Medicamento> {
    return defer(() => axios.post<{ data: Medicamento }>(this.url, medicamento))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, medicamento: MedicamentoGuardar): Observable<Medicamento> {
    return defer(() => axios.patch<{ data: Medicamento }>(`${this.url}/${id}`, medicamento))
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
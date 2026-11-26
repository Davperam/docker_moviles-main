import { Injectable } from '@angular/core';
import { defer, map, Observable } from 'rxjs';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

export interface DocumentoClinico {
  iddocumento: number;
  idexpediente: number;
  nombredocumento: string;
  rutaarchivo: string;
  tipodocumento: string;
  fechacarga: string;
  activo: number;
}

export interface DocumentoClinicoGuardar {
  idexpediente: number;
  nombredocumento: string;
  rutaarchivo: string;
  tipodocumento: string;
  activo: number;
}

@Injectable({ providedIn: 'root' })
export class DocumentosclinicosService {
  constructor(private auth: AuthService) {}
  private url = environment.apiUrl + '/items/documentoclinico';

  private filtro(busqueda: string): Record<string, string> {
    const texto = busqueda.trim();
    return texto ? { filter: JSON.stringify({ _or: [
      { nombredocumento: { _icontains: texto } },
      { tipodocumento: { _icontains: texto } }
    ] }) } : {};
  }

  listado(pagina = 1, porPagina = 8, busqueda = ''): Observable<DocumentoClinico[]> {
    return defer(() => this.auth.cliente.get<{ data: DocumentoClinico[] }>(this.url, {
      params: { page: pagina, limit: porPagina, sort: 'iddocumento', ...this.filtro(busqueda) }
    })).pipe(map(response => response.data.data));
  }

  detalle(id: number): Observable<DocumentoClinico> {
    return defer(() => this.auth.cliente.get<{ data: DocumentoClinico }>(this.url + '/' + id))
      .pipe(map(response => response.data.data));
  }

  // Método para cargar el catálogo de expedientes sin usar axios en la página
  expedientes(): Observable<any[]> {
    return defer(() => this.auth.cliente.get<{ data: any[] }>(`${environment.apiUrl}/items/expedienteclinico`))
      .pipe(map(response => response.data.data));
  }

  crear(documento: DocumentoClinicoGuardar): Observable<DocumentoClinico> {
    return defer(() => this.auth.cliente.post<{ data: DocumentoClinico }>(this.url, documento))
      .pipe(map(response => response.data.data));
  }

  actualizar(id: number, documento: DocumentoClinicoGuardar): Observable<DocumentoClinico> {
    return defer(() => this.auth.cliente.patch<{ data: DocumentoClinico }>(this.url + '/' + id, documento))
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
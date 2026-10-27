import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { defer, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private apiUrl = environment.apiUrl + '/items/cita';

  constructor(private http: HttpClient) {}

  listado(pagina: number = 1, porPagina: number = 10, busqueda: string = ''): Observable<Cita[]> {
    let params = new HttpParams()
      .set('page', pagina.toString())
      .set('per_page', porPagina.toString());
    
    if (busqueda) {
      params = params.set('q', busqueda);
    }

    return defer(() => this.http.get<any>(this.apiUrl, { params })).pipe(
      map(response => response.data || response) // Ajusta según la estructura de tu respuesta API
    );
  }

  detalle(id: number): Observable<Cita> {
    return defer(() => this.http.get<Cita>(`${this.apiUrl}/${id}`)).pipe(
      map(response => response.data || response)
    );
  }

  crear(cita: CitaGuardar): Observable<Cita> {
    return defer(() => this.http.post<Cita>(this.apiUrl, cita));
  }

  actualizar(id: number, cita: CitaGuardar): Observable<Cita> {
    return defer(() => this.http.patch<Cita>(`${this.apiUrl}/${id}`, cita));
  }

  eliminar(id: number): Observable<void> {
    return defer(() => this.http.delete<void>(`${this.apiUrl}/${id}`));
  }

  total(busqueda: string = ''): Observable<number> {
    let params = new HttpParams();
    if (busqueda) {
      params = params.set('q', busqueda);
    }
    return defer(() => this.http.get<any>(`${this.apiUrl}/total`, { params })).pipe(
      map(response => response.total || response)
    );
  }
}
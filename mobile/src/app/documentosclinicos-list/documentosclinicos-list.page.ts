import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface DocumentoClinico {
  iddocumento: number;
  idexpediente: number;
  nombredocumento: string;
  rutaarchivo: string;
  tipodocumento: string;
  fechacarga: string;
  activo: number;
}

@Component({
  selector: 'app-documentosclinicos-list',
  templateUrl: './documentosclinicos-list.page.html',
  styleUrls: ['./documentosclinicos-list.page.scss'],
  standalone: false,
})
export class DocumentosclinicosListPage implements OnInit {

  documentos: DocumentoClinico[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarDocumentos();
  }

  async cargarDocumentos(): Promise<void> {
    try {
      const response = await axios.get<{ data: DocumentoClinico[] }>(
        `${environment.apiUrl}/items/documentoclinico`
      );
      this.documentos = response.data.data; 
    } catch (error) {
      console.error('Error al cargar los documentos clínicos:', error);
    }
  }

}
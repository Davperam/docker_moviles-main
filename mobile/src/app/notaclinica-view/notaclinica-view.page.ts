import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface NotaClinica {
  idnota: number;
  idexpediente: number;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

@Component({
  selector: 'app-notaclinica-view',
  templateUrl: './notaclinica-view.page.html',
  styleUrls: ['./notaclinica-view.page.scss'],
  standalone: false,
})
export class NotaclinicaViewPage implements OnInit {

  nota: NotaClinica | null = null;
mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) {}

  ngOnInit(): void {
    this.cargarNota();
  }

  async cargarNota(): Promise<void> {
  const id = this.route.snapshot.paramMap.get('id');

  this.nota = null;
  this.mensajeError = '';

  if (!id) {
    this.mensajeError = 'No se recibió el ID del nota.';
    return;
  }

  const loading = await this.loading.create({
    message: 'Cargando nota...',
    spinner: 'bubbles',
  });

  await loading.present();

  try {
    const response = await axios.get<{ data: NotaClinica }>(
      `${environment.apiUrl}/items/notaclinica/${encodeURIComponent(id)}`
    );

    this.nota = response.data.data;
  } catch (error) {
    console.error('Error al cargar el nota:', error);
    this.mensajeError = 'No se pudo cargar el nota. Revisa el ID, la conexión y los permisos de lectura.';
  } finally {
    await loading.dismiss();
  }
}

  

}

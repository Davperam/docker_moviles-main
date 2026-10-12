import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Citadetalle {
  iddetallecita: number;
  idcita: number;
  idservicio: number;
  cantidad: number;
  precio: number;
  observaciones: string;
}

@Component({
  selector: 'app-citadetalles-view',
  templateUrl: './citadetalles-view.page.html',
  styleUrls: ['./citadetalles-view.page.scss'],
  standalone: false,
})
export class CitadetallesViewPage implements OnInit {

  citadetalle: Citadetalle | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.cargarCitadetalle();
  }
  async cargarCitadetalle(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.citadetalle = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del detalle de la cita.';
      return;
    }

    const loading = await this.loading.create({
      message: 'Cargando detalle de la cita...',
      spinner: 'bubbles',
    });
    
    await loading.present();

    try {
      const response = await axios.get<{ data: Citadetalle }>(
        `${environment.apiUrl}/items/citadetalle/${encodeURIComponent(id)}`
      );
      this.citadetalle = response.data.data;
    } catch (error) {
      console.error('Error al cargar el detalle de la cita:', error);
      this.mensajeError = 'Ocurrió un error al cargar el detalle de la cita.';
    } finally {
      loading.dismiss();
    }
  }

}

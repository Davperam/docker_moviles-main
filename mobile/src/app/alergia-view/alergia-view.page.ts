import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

import { firstValueFrom } from 'rxjs';
import { AlergiasService } from '../services/alergia-service';
import { environment } from '../../environments/environment';

interface Alergia {
  idalergia: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-alergia-view',
  templateUrl: './alergia-view.page.html',
  styleUrls: ['./alergia-view.page.scss'],
  standalone: false,
})
export class AlergiaViewPage implements OnInit {

  alergia: Alergia | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private alergiaService: AlergiasService,
    private loading: LoadingController
  ) { }

  ngOnInit() {
    this.cargarAlergia();
  }
  async cargarAlergia(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.alergia = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID de la alergia.';
      return;
    }

    const loading = await this.loading.create({
      message: 'Cargando alergia...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      this.alergia = await firstValueFrom(this.alergiaService.detalle(Number(id)));
    } catch (error) {
      console.error('Error al cargar la alergia:', error);
      this.mensajeError = 'No se pudo cargar la alergia. Revisa el ID, la conexión y los permisos de lectura.';
    } finally {
      await loading.dismiss();
    }
  }

  abrirPagina(): void {
    if (!this.alergia) {
      return;
    }

    const url = `${environment.apiUrl}/items/alergia/${this.alergia.idalergia}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

}

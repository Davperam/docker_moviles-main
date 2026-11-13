import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { DentistasService } from '../services/dentistas';

interface Dentista {
  iddentista: number;
  nombre: string;
  paterno: string;
  materno: string;
  cedula: string;
  telefono: string;
  correo: string;
  activo: number;
}

@Component({
  selector: 'app-dentistas-view',
  templateUrl: './dentistas-view.page.html',
  styleUrls: ['./dentistas-view.page.scss'],
  standalone: false,
})
export class DentistasViewPage implements OnInit {

  dentista: Dentista | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private dentistasService: DentistasService
  ) { }

  ngOnInit() {
    this.cargarDentista();
  }

  async cargarDentista(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.dentista = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del dentista.';
      return;
    }

    const loading = await this.loading.create({
      message: 'Cargando dentista...',
      spinner: 'bubbles',
    });
    
    await loading.present();

    try {
      this.dentista = await firstValueFrom(this.dentistasService.detalle(Number(id)));
    } catch (error) {
      console.error('Error al cargar el dentista:', error);
      this.mensajeError = 'Ocurrió un error al cargar el dentista.';
    } finally {
      await loading.dismiss();
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ExpedienteclinicoService } from '../services/expedienteclinico';

interface Paciente {
  id?: number;
  idpaciente?: number;
  nombre: string;
  paterno: string;
  materno: string;
}

interface ExpedienteClinico {
  idexpediente: number;
  idpaciente: number | any;
  enfermedades: string;
  observaciones: string;
  apertura: string;
  pacienteDetalle?: Paciente;
}

@Component({
  selector: 'app-expedienteclinico-view',
  templateUrl: './expedienteclinico-view.page.html',
  styleUrls: ['./expedienteclinico-view.page.scss'],
  standalone: false,
})
export class ExpedienteclinicoViewPage implements OnInit {

  expediente: ExpedienteClinico | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private expedientesService: ExpedienteclinicoService
  ) { }

  ngOnInit() {
    this.cargarExpediente();
  }

  async cargarExpediente(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.expediente = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del expediente clínico.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando expediente clínico...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      this.expediente = await firstValueFrom(
        this.expedientesService.detalle(Number(id))
      );

      // Si Directus devolvió el objeto paciente directamente
      if (typeof this.expediente.idpaciente === 'object' && this.expediente.idpaciente !== null) {
        this.expediente.pacienteDetalle = this.expediente.idpaciente as Paciente;
      } 
      // Respaldo: si vino únicamente el número, consultamos al paciente a través del servicio
      else if (this.expediente.idpaciente) {
        try {
          this.expediente.pacienteDetalle = await firstValueFrom(
            this.expedientesService.paciente(Number(this.expediente.idpaciente))
          );
        } catch (err) {
          console.warn('No se pudo obtener el nombre del paciente por separado:', err);
        }
      }

    } catch (error) {
      console.error('Error al cargar el expediente clínico:', error);
      this.mensajeError = 'Ocurrió un error al cargar el expediente clínico.';
    } finally {
      await loading.dismiss();
    }
  }
}
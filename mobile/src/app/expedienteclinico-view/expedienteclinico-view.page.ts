import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ExpedienteclinicoService, ExpedienteClinico, Paciente } from '../services/expedienteclinico';


@Component({
  selector: 'app-expedienteclinico-view',
  templateUrl: './expedienteclinico-view.page.html',
  styleUrls: ['./expedienteclinico-view.page.scss'],
  standalone: false,
})
export class ExpedienteclinicoViewPage {

  expediente: ExpedienteClinico | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private expedientesService: ExpedienteclinicoService
  ) { }

  ionViewWillEnter() {
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
      const expediente = await firstValueFrom(
        this.expedientesService.detalle(Number(id))
      );

      // Si Directus devolvió el objeto paciente directamente
      if (typeof expediente.idpaciente === 'object' && expediente.idpaciente !== null) {
        expediente.pacienteDetalle = expediente.idpaciente as Paciente;
      } 
      // Respaldo: si vino únicamente el número, consultamos al paciente a través del servicio
      else if (expediente.idpaciente) {
        try {
          expediente.pacienteDetalle = await firstValueFrom(
            this.expedientesService.paciente(Number(expediente.idpaciente))
          );
        } catch (err) {
          console.warn('No se pudo obtener el nombre del paciente por separado:', err);
        }
      }

      this.expediente = expediente;

    } catch (error) {
      console.error('Error al cargar el expediente clínico:', error);
      this.mensajeError = 'Ocurrió un error al cargar el expediente clínico.';
    } finally {
      await loading.dismiss();
    }
  }
}
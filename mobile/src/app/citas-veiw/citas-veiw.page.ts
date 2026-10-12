import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Cita {
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

@Component({
  selector: 'app-citas-veiw',
  templateUrl: './citas-veiw.page.html',
  styleUrls: ['./citas-veiw.page.scss'],
  standalone: false,
})
export class CitasVeiwPage implements OnInit {

    cita: Cita | null = null;
    mensajeError: string = '';
  
    constructor(
      private route: ActivatedRoute,
      private loading: LoadingController
    ) { }
  
    ngOnInit() {
      this.cargarCita();
    }
    async cargarCita(): Promise<void> {
      const id = this.route.snapshot.paramMap.get('id');
  
      this.cita = null;
      this.mensajeError = '';
  
      if (!id) {
        this.mensajeError = 'No se recibió el ID de la cita.';
        return;
      }
  
      const loading = await this.loading.create({
        message: 'Cargando cita...',
        spinner: 'bubbles',
      });
  
      await loading.present();
  
      try {
        const response = await axios.get<{ data: Cita }>(
            `${environment.apiUrl}/items/cita/${encodeURIComponent(id)}`
        );
  
        this.cita = response.data.data;
      } catch (error) {
        console.error('Error al cargar la cita:', error);
        this.mensajeError = 'No se pudo cargar la cita. Revisa el ID, la conexión y los permisos de lectura.';
      } finally {
        await loading.dismiss();
      }
    }

}

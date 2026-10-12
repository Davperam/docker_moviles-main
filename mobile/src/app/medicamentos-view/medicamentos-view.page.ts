import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Medicamento {
  idmedicamento: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-medicamentos-view',
  templateUrl: './medicamentos-view.page.html',
  styleUrls: ['./medicamentos-view.page.scss'],
  standalone: false,
})
export class MedicamentosViewPage implements OnInit {

  medicamento: Medicamento | null = null;
  mensajeError: string = '';

  constructor(
    private route: ActivatedRoute,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.cargarMedicamento();
  }
  async cargarMedicamento(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    this.medicamento = null;
    this.mensajeError = '';

    if (!id) {
      this.mensajeError = 'No se recibió el ID del medicamento.';
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Cargando medicamento...',
      spinner: 'bubbles',
    });

    await loading.present();

    try {
      const response = await axios.get<{ data: Medicamento }>(
        `${environment.apiUrl}/items/medicamento/${encodeURIComponent(id)}`
      );
      this.medicamento = response.data.data;
    } catch (error) {
      console.error('Error al cargar el medicamento:', error);
      this.mensajeError = 'Ocurrió un error al cargar el medicamento.';
    } finally {
      loading.dismiss();
    }
  }

}

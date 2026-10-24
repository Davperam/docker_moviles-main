import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface Servicio {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: string;
}

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.page.html',
  styleUrls: ['./servicios-form.page.scss'],
  standalone: false,
})
export class ServiciosFormPage implements OnInit {

  servicioForm!: FormGroup;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    nombre: {
      required: 'El nombre del servicio es obligatorio.',
      maxlength: 'El nombre no debe superar los 150 caracteres.'
    },
    descripcion: {
      required: 'La descripción es obligatoria.'
    },
    precio: {
      required: 'El precio es obligatorio.',
      min: 'El precio debe ser mayor o igual a 0.'
    },
    duracion: {
      required: 'La duración es obligatoria (ej. 01:30:00).'
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.servicioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      duracion: ['', [Validators.required]],
    });
  }

  getError(controlName: string): string {
    const control = this.servicioForm.get(controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }

    const tipoError = Object.keys(control.errors)[0];

    return this.mensajesValidacion[controlName]?.[tipoError]
      ?? 'El valor ingresado no es válido.';
  }

  async cerrarModal(): Promise<void> {
    await this.modalController.dismiss({
      guardado: false
    });
  }

  async guardarServicio(): Promise<void> {
    if (this.servicioForm.invalid) {
      this.servicioForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.servicioForm.value;

    const servicioData: Servicio = {
      nombre: valores.nombre?.trim() ?? '',
      descripcion: valores.descripcion?.trim() ?? '',
      precio: Number(valores.precio) || 0,
      duracion: valores.duracion?.trim() ?? '',
    };

    try {
      await axios.post(
        `${environment.apiUrl}/items/servicio`,
        servicioData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const alerta = await this.alertController.create({
        header: 'Servicio guardado',
        message: 'El servicio fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Detalle completo del error de Directus:', JSON.stringify(error.response?.data, null, 2) || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible guardar el servicio. Revisa los datos en la consola.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
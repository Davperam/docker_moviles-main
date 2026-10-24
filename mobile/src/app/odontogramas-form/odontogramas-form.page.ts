import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface OdontogramaCrear {
  idexpediente: number;
  observaciones: string;
  diente: string;
  estado: string;
  tratamiento: string;
}

@Component({
  selector: 'app-odontogramas-form',
  templateUrl: './odontogramas-form.page.html',
  styleUrls: ['./odontogramas-form.page.scss'],
  standalone: false,
})
export class OdontogramasFormPage implements OnInit {

  odontogramasForm!: FormGroup;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    observaciones: {
      required: 'Las observaciones son obligatorias.',
      maxlength: 'Las observaciones no deben superar 150 caracteres.'
    },
    diente: {
      required: 'El diente es obligatorio.',
      maxlength: 'El diente no debe superar 150 caracteres.'
    },
    estado: {
      required: 'El estado es obligatorio.',
      maxlength: 'El estado no debe superar 150 caracteres.'
    },
    tratamiento: {
      required: 'El tratamiento es obligatorio.',
      maxlength: 'El tratamiento no debe superar 150 caracteres.'
    },
    idexpediente: {
      required: 'El idexpediente es obligatorio.',
      min: 'El idexpediente debe ser igual o mayor que cero.',
      pattern: 'El idexpediente debe contener únicamente números enteros.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(): void {
    this.odontogramasForm = this.formBuilder.group({
      observaciones: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      diente: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      tratamiento: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      estado: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      idexpediente: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+$')
      ]]
    });
  }

  getError(controlName: string): string {
    const control = this.odontogramasForm.get(controlName);

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

  async guardarOdontogramas(): Promise<void> {
    if (this.odontogramasForm.invalid) {
      this.odontogramasForm.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const valores = this.odontogramasForm.value;

    const odontograma: OdontogramaCrear = {
      observaciones: valores.observaciones?.trim() ?? '',
      estado: valores.estado?.trim() ?? '',
      diente: valores.diente?.trim() ?? '',
      tratamiento: valores.tratamiento?.trim() ?? '',
      idexpediente: Number(valores.idexpediente) || 0
    };

    try {
      await axios.post(
        `${environment.apiUrl}/items/odontograma`,
        odontograma,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const alerta = await this.alertController.create({
        header: 'Odontograma guardado',
        message: 'El odontograma fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({
        guardado: true
      });
    } catch (error: any) {
      console.error('Error al guardar el odontograma:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible guardar el odontograma. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
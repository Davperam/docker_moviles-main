import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface OdontogramaGuardar {
  idexpediente: number;
  observaciones: string;
  diente: number; // <-- Cambiado a number
  estado: string;
  tratamiento: string;
}

interface OdontogramaDetalle {
  idodontograma?: number;
  id?: number;
  idexpediente: number;
  observaciones: string;
  diente: number; // <-- Cambiado a number
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

  @Input() id?: number;

  odontogramasForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    observaciones: {
      required: 'Las observaciones son obligatorias.',
      maxlength: 'Las observaciones no deben superar 150 caracteres.'
    },
    diente: {
      required: 'El diente es obligatorio.',
      min: 'El número de diente debe ser mayor o igual a cero.',
      pattern: 'El diente debe contener únicamente números enteros.'
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

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();

    if (this.esEdicion) {
      await this.cargarOdontograma();
    }
  }

  private crearFormulario(): void {
    this.odontogramasForm = this.formBuilder.group({
      observaciones: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      diente: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern('^[0-9]+$')
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

  private async cargarOdontograma(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const response = await axios.get<{ data: OdontogramaDetalle }>(
        `${environment.apiUrl}/items/odontograma/${this.id}`
      );
      const o = response.data.data;

      this.odontogramasForm.patchValue({
        idexpediente: o.idexpediente,
        observaciones: o.observaciones,
        diente: o.diente,
        estado: o.estado,
        tratamiento: o.tratamiento
      });
    } catch (error) {
      console.error('Error al cargar el odontograma:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del odontograma. Revisa la conexión y los permisos de lectura en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
    }
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

    const odontograma: OdontogramaGuardar = {
      observaciones: valores.observaciones ? String(valores.observaciones).trim() : '',
      estado: valores.estado ? String(valores.estado).trim() : '',
      diente: Number(valores.diente) || 0, // <-- Convertido correctamente a número
      tratamiento: valores.tratamiento ? String(valores.tratamiento).trim() : '',
      idexpediente: Number(valores.idexpediente) || 0
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        await axios.patch(
          `${environment.apiUrl}/items/odontograma/${this.id}`,
          odontograma,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        await axios.post(
          `${environment.apiUrl}/items/odontograma`,
          odontograma,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Odontograma actualizado' : 'Odontograma guardado',
        message: this.esEdicion ? 'El odontograma fue actualizado correctamente.' : 'El odontograma fue registrado correctamente.',
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
        message: this.esEdicion ? 'No fue posible actualizar el odontograma.' : 'No fue posible guardar el odontograma. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
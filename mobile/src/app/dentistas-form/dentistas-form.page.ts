import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface DentistaGuardar {
  nombre: string;
  paterno: string;
  materno: string;
  cedula: string;
  telefono: string;
  correo: string;
  activo: number;
}

interface DentistaDetalle {
  iddentista?: number;
  id?: number;
  nombre: string;
  paterno: string;
  materno: string;
  cedula: string;
  telefono: string;
  correo: string;
  activo: number;
}

@Component({
  selector: 'app-dentistas-form',
  templateUrl: './dentistas-form.page.html',
  styleUrls: ['./dentistas-form.page.scss'],
  standalone: false,
})
export class DentistasFormPage implements OnInit {

  @Input() id?: number;

  dentistaForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    nombre: {
      required: 'El nombre es obligatorio.',
      maxlength: 'El nombre no debe superar los 50 caracteres.'
    },
    paterno: {
      required: 'El apellido paterno es obligatorio.',
      maxlength: 'El apellido no debe superar los 50 caracteres.'
    },
    materno: {
      maxlength: 'El apellido materno no debe superar los 50 caracteres.'
    },
    cedula: {
      required: 'La cédula profesional es obligatoria.'
    },
    telefono: {
      required: 'El teléfono es obligatorio.',
      maxlength: 'El teléfono no debe superar los 10 dígitos.',
      pattern: 'El teléfono debe contener solo números.'
    },
    correo: {
      required: 'El correo electrónico es obligatorio.',
      email: 'Ingresa un correo electrónico válido.',
      maxlength: 'El correo no debe superar los 150 caracteres.'
    },
    activo: {
      required: 'El campo activo es obligatorio.'
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
      await this.cargarDentista();
    }
  }

  private crearFormulario(): void {
    this.dentistaForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      paterno: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      materno: ['', [
        Validators.maxLength(50)
      ]],
      cedula: ['', [
        Validators.required
      ]],
      telefono: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$')
      ]],
      correo: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ]],
      activo: [1, [
        Validators.required
      ]]
    });
  }

  getError(controlName: string): string {
    const control = this.dentistaForm.get(controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }

    const tipoError = Object.keys(control.errors)[0];

    return this.mensajesValidacion[controlName]?.[tipoError]
      ?? 'El valor ingresado no es válido.';
  }

  private async cargarDentista(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const response = await axios.get<{ data: DentistaDetalle }>(
        `${environment.apiUrl}/items/dentista/${this.id}`
      );

      const dentista = response.data.data;

      this.dentistaForm.patchValue({
        nombre: dentista.nombre,
        paterno: dentista.paterno,
        materno: dentista.materno,
        cedula: dentista.cedula,
        telefono: dentista.telefono,
        correo: dentista.correo,
        activo: dentista.activo !== undefined ? dentista.activo : 1
      });
    } catch (error) {
      console.error('Error al cargar el dentista:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del dentista. Revisa la conexión, el identificador y los permisos de lectura en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
    }
  }

  async cerrarModal(): Promise<void> {
    await this.modalController.dismiss({
      guardado: false
    });
  }

  async guardarDentista(): Promise<void> {
    if (this.dentistaForm.invalid) {
      this.dentistaForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.dentistaForm.value;

    const dentista: DentistaGuardar = {
      nombre: valores.nombre ? String(valores.nombre).trim() : '',
      paterno: valores.paterno ? String(valores.paterno).trim() : '',
      materno: valores.materno ? String(valores.materno).trim() : '',
      cedula: valores.cedula ? String(valores.cedula).trim() : '',
      telefono: valores.telefono ? String(valores.telefono).trim() : '',
      correo: valores.correo ? String(valores.correo).trim() : '',
      activo: Number(valores.activo) || 1
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        await axios.patch(
          `${environment.apiUrl}/items/dentista/${this.id}`,
          dentista,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        await axios.post(
          `${environment.apiUrl}/items/dentista`,
          dentista,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Dentista actualizado' : 'Dentista guardado',
        message: this.esEdicion
          ? 'El dentista fue actualizado correctamente.'
          : 'El dentista fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error(
        this.esEdicion
          ? 'Error al actualizar el dentista:'
          : 'Error al guardar el dentista:',
        error.response?.data || error
      );

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion
          ? 'No fue posible actualizar el dentista. Revisa los datos, la conexión y los permisos de actualización en Directus.'
          : 'No fue posible guardar el dentista. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
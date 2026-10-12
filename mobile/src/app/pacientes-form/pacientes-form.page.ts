import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface PacienteCrear {
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: string;
  telefono: string;
  correo: string;
  direccion: string;
  registro: string;
  activo: number;
}

@Component({
  selector: 'app-pacientes-form',
  templateUrl: './pacientes-form.page.html',
  styleUrls: ['./pacientes-form.page.scss'],
  standalone: false,
})
export class PacientesFormPage implements OnInit {

  pacienteForm!: FormGroup;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    nombre: {
      required: 'El nombre es obligatorio.',
      maxlength: 'El nombre no debe superar 150 caracteres.'
    },
    precio: {
      required: 'El precio es obligatorio.',
      min: 'El precio debe ser igual o mayor que cero.'
    },
    stock: {
      required: 'El stock es obligatorio.',
      min: 'El stock debe ser igual o mayor que cero.',
      pattern: 'El stock debe contener únicamente números enteros.'
    }
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
    this.pacienteForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      paterno: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      materno: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      nacimiento: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      tiposangre: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      telefono: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      correo: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      direccion: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      registro: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      activo: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
    });
  }
  getError(controlName: string): string {
    const control = this.pacienteForm.get(controlName);

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

  async guardarPaciente(): Promise<void> {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const valores = this.pacienteForm.value;

    const paciente: PacienteCrear = {
      nombre: valores.nombre.trim(),
      paterno: valores.paterno.trim(),
      materno: valores.materno.trim(),
      nacimiento: valores.nacimiento(),
      tiposangre: valores.tiposangre(),
      direccion: valores.direccion(),
      telefono: valores.telefono(),
      correo: valores.correo(),
      registro: valores.registro(),
      activo: valores.activo()
    };

    try {
      await axios.post(
        `${environment.apiUrl}/items/paciente`,
        paciente,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const alerta = await this.alertController.create({
        header: 'Paciente guardado',
        message: 'El paciente fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({
        guardado: true
      });
    } catch (error) {
      console.error('Error al guardar el paciente:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible guardar el paciente. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}

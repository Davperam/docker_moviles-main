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
  tiposangre: number; // <-- Cambiado a number porque ahora es una llave foránea (ID)
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

  // Lista opcional para poblar el selector en el HTML
  tiposSangreList = [
    { id: 1, nombre: 'O+' },
    { id: 2, nombre: 'A+' },
    { id: 3, nombre: 'B+' },
    { id: 4, nombre: 'AB+' },
    { id: 5, nombre: 'O-' },
    { id: 6, nombre: 'A-' },
    { id: 7, nombre: 'B-' },
    { id: 8, nombre: 'AB-' }
  ];

  mensajesValidacion: Record<string, Record<string, string>> = {
    nombre: { required: 'El nombre es obligatorio.' },
    paterno: { required: 'El apellido paterno es obligatorio.' },
    materno: { required: 'El apellido materno es obligatorio.' },
    nacimiento: { required: 'La fecha de nacimiento es obligatoria.' },
    tiposangre: { required: 'El tipo de sangre es obligatorio.' },
    telefono: { required: 'El teléfono es obligatorio.' },
    correo: { required: 'El correo es obligatorio.' },
    direccion: { required: 'La dirección es obligatoria.' },
    registro: { required: 'La fecha de registro es obligatoria.' },
    activo: { required: 'El campo activo es obligatorio.' }
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
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      paterno: ['', [Validators.required, Validators.maxLength(150)]],
      materno: ['', [Validators.required, Validators.maxLength(150)]],
      nacimiento: ['', [Validators.required]],
      tiposangre: ['', [Validators.required]], // Recibirá el ID numérico
      telefono: ['', [Validators.required, Validators.maxLength(150)]],
      correo: ['', [Validators.required, Validators.maxLength(150)]],
      direccion: ['', [Validators.required]],
      registro: ['', [Validators.required]],
      activo: [1, [Validators.required]], // Por defecto activo (1)
    });
  }

  getError(controlName: string): string {
    const control = this.pacienteForm.get(controlName);
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }
    const tipoError = Object.keys(control.errors)[0];
    return this.mensajesValidacion[controlName]?.[tipoError] ?? 'El valor ingresado no es válido.';
  }

  async cerrarModal(): Promise<void> {
    await this.modalController.dismiss({ guardado: false });
  }

  async guardarPaciente(): Promise<void> {
    if (this.pacienteForm.invalid) {
      this.pacienteForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.pacienteForm.value;

    const paciente: PacienteCrear = {
      nombre: valores.nombre?.trim() ?? '',
      paterno: valores.paterno?.trim() ?? '',
      materno: valores.materno?.trim() ?? '',
      nacimiento: valores.nacimiento?.trim() ?? '',
      tiposangre: Number(valores.tiposangre) || 1, // <-- Se asegura de mandar el ID como número
      direccion: valores.direccion?.trim() ?? '',
      telefono: valores.telefono?.trim() ?? '',
      correo: valores.correo?.trim() ?? '',
      registro: valores.registro?.trim() ?? '',
      activo: Number(valores.activo) || 1
    };

    try {
      await axios.post(
        `${environment.apiUrl}/items/paciente`,
        paciente,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      const alerta = await this.alertController.create({
        header: 'Paciente guardado',
        message: 'El paciente fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Error al guardar el paciente:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible guardar el paciente. Revisa los datos en la consola.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
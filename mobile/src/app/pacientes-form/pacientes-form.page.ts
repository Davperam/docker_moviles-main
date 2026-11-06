import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface PacienteGuardar {
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: number;
  telefono: string;
  correo: string;
  direccion: string;
  registro: string;
  activo: number;
}

interface PacienteDetalle {
  idpaciente: number;
  nombre: string;
  paterno: string;
  materno: string;
  nacimiento: string;
  tiposangre: any;
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

  // Recibe el ID enviado desde componentProps del modal (si no llega ID, es modo creación)
  @Input() id?: number;

  pacienteForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  // Lista para poblar el selector en el HTML
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

  // Getter para determinar si se esta editando o creando
  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();

    // Si viene un ID, se consulta el paciente existente
    if (this.esEdicion) {
      await this.cargarPaciente();
    }
  }

  private crearFormulario(): void {
    this.pacienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      paterno: ['', [Validators.required, Validators.maxLength(150)]],
      materno: ['', [Validators.required, Validators.maxLength(150)]],
      nacimiento: ['', [Validators.required]],
      tiposangre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(150)]],
      correo: ['', [Validators.required, Validators.maxLength(150)]],
      direccion: ['', [Validators.required]],
      registro: ['', [Validators.required]],
      activo: [1, [Validators.required]],
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

  // Carga los datos del paciente desde Directus y los coloca en el formulario
  private async cargarPaciente(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const response = await axios.get<{ data: PacienteDetalle }>(
        `${environment.apiUrl}/items/paciente/${this.id}`
      );

      const paciente = response.data.data;

      // Si Directus devuelve la relación como objeto, obtenemos su ID
      const tiposangreId = typeof paciente.tiposangre === 'object' && paciente.tiposangre !== null
        ? paciente.tiposangre.id
        : paciente.tiposangre;

      this.pacienteForm.patchValue({
        nombre: paciente.nombre,
        paterno: paciente.paterno,
        materno: paciente.materno,
        nacimiento: paciente.nacimiento,
        tiposangre: tiposangreId,
        direccion: paciente.direccion,
        telefono: paciente.telefono,
        correo: paciente.correo,
        registro: paciente.registro,
        activo: paciente.activo
      });
    } catch (error: any) {
      console.error('Error al cargar el paciente:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del paciente. Revisa la conexión, el identificador y los permisos de lectura en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
    }
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

    const paciente: PacienteGuardar = {
      nombre: valores.nombre?.trim() ?? '',
      paterno: valores.paterno?.trim() ?? '',
      materno: valores.materno?.trim() ?? '',
      nacimiento: valores.nacimiento?.trim() ?? '',
      tiposangre: Number(valores.tiposangre) || 1,
      direccion: valores.direccion?.trim() ?? '',
      telefono: valores.telefono?.trim() ?? '',
      correo: valores.correo?.trim() ?? '',
      registro: valores.registro?.trim() ?? '',
      activo: Number(valores.activo) || 1
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        // Modo Actualización con PATCH
        await axios.patch(
          `${environment.apiUrl}/items/paciente/${this.id}`,
          paciente,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        // Modo Creación con POST
        await axios.post(
          `${environment.apiUrl}/items/paciente`,
          paciente,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Paciente actualizado' : 'Paciente guardado',
        message: this.esEdicion
          ? 'El paciente fue actualizado correctamente.'
          : 'El paciente fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error(
        this.esEdicion ? 'Error al actualizar el paciente:' : 'Error al guardar el paciente:',
        error.response?.data || error
      );

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion
          ? 'No fue posible actualizar el paciente. Revisa los datos, la conexión y los permisos de actualización en Directus.'
          : 'No fue posible guardar el paciente. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
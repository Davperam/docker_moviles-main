import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface EspecialidadGuardar {
  nombre: string;
  descripcion: string;
  activo: number;
}

interface EspecialidadDetalle {
  id: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-especialidad-form',
  templateUrl: './especialidad-form.page.html',
  styleUrls: ['./especialidad-form.page.scss'],
  standalone: false
})
export class EspecialidadFormPage implements OnInit {

  // Recibe el ID enviado desde componentProps del modal
  @Input() id?: number;

  especialidadForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    nombre: {
      required: 'El nombre es obligatorio.',
      maxlength: 'El nombre no debe superar 150 caracteres.'
    },
    descripcion: {
      required: 'La descripción es obligatoria.',
    },
    activo: {
      required: 'El campo activo es obligatorio.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  // Determina si está en modo edición si se recibió un id
  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();

    // Si viene un ID, consulta y llena los datos existentes
    if (this.esEdicion) {
      await this.cargarEspecialidad();
    }
  }

  private crearFormulario(): void {
    this.especialidadForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      descripcion: [''],
      activo: [1, [
        Validators.required
      ]]
    });
  }

  getError(controlName: string): string {
    const control = this.especialidadForm.get(controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }

    const tipoError = Object.keys(control.errors)[0];

    return this.mensajesValidacion[controlName]?.[tipoError]
      ?? 'El valor ingresado no es válido.';
  }

  // Carga los datos de la especialidad desde Directus Metodo GET
  private async cargarEspecialidad(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const response = await axios.get<{ data: EspecialidadDetalle }>(
        `${environment.apiUrl}/items/especialidad/${this.id}`
      );

      const especialidad = response.data.data;

      this.especialidadForm.patchValue({
        nombre: especialidad.nombre,
        descripcion: especialidad.descripcion,
        activo: especialidad.activo
      });
    } catch (error) {
      console.error('Error al cargar la especialidad:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos de la especialidad. Revisa la conexión, el identificador y los permisos de lectura en Directus.',
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

  async guardarEspecialidad(): Promise<void> {
    if (this.especialidadForm.invalid) {
      this.especialidadForm.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const valores = this.especialidadForm.value;

    const especialidad: EspecialidadGuardar = {
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion?.trim() ?? '',
      activo: Number(valores.activo)
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        // PATCH si estamos editando
        await axios.patch(
          `${environment.apiUrl}/items/especialidad/${this.id}`,
          especialidad,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        // POST si estamos creando
        await axios.post(
          `${environment.apiUrl}/items/especialidad`,
          especialidad,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Especialidad actualizada' : 'Especialidad guardada',
        message: this.esEdicion
          ? 'La especialidad fue actualizada correctamente.'
          : 'La especialidad fue registrada correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({
        guardado: true
      });
    } catch (error) {
      console.error(
        this.esEdicion
          ? 'Error al actualizar la especialidad:'
          : 'Error al guardar la especialidad:',
        error
      );

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion
          ? 'No fue posible actualizar la especialidad. Revisa los datos, la conexión y los permisos de actualización en Directus.'
          : 'No fue posible guardar la especialidad. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
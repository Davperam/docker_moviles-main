import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface ServicioGuardar {
  nombre: string;
  descripcion: string;
  precio: number;
  duracion: number;
}

interface ServicioDetalle {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number | string;
  duracion: number | string;
}

@Component({
  selector: 'app-servicios-form',
  templateUrl: './servicios-form.page.html',
  styleUrls: ['./servicios-form.page.scss'],
  standalone: false,
})
export class ServiciosFormPage implements OnInit {

  // Recibe el ID desde el listado si se va a editar
  @Input() id?: number;

  servicioForm!: FormGroup;
  cargando: boolean = false;
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
      required: 'La duración en minutos es obligatoria.',
      min: 'La duración debe ser de al menos 1 minuto.'
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  // Determina si estamos en modo edición
  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();

    // Si viene un ID, cargamos los datos existentes del servicio
    if (this.esEdicion) {
      await this.cargarServicio();
    }
  }

  private crearFormulario(): void {
    this.servicioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(150)]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.min(0)]],
      duracion: ['', [Validators.required, Validators.min(1)]]
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

  // Consulta el servicio por su ID y llena el formulario
  private async cargarServicio(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const response = await axios.get<{ data: ServicioDetalle }>(
        `${environment.apiUrl}/items/servicio/${this.id}`
      );

      const servicio = response.data.data;

      this.servicioForm.patchValue({
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        precio: servicio.precio,
        duracion: servicio.duracion
      });
    } catch (error: any) {
      console.error('Error al cargar el servicio:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del servicio. Revisa la conexión, el ID y los permisos en Directus.',
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

  async guardarServicio(): Promise<void> {
    if (this.servicioForm.invalid) {
      this.servicioForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.servicioForm.value;

    const servicioData: ServicioGuardar = {
      nombre: valores.nombre?.trim() ?? '',
      descripcion: valores.descripcion?.trim() || 'Sin descripción',
      precio: Number(valores.precio) || 0,
      duracion: Number(valores.duracion)
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        // Petición PATCH para actualizar
        await axios.patch(
          `${environment.apiUrl}/items/servicio/${this.id}`,
          servicioData,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      } else {
        // Petición POST para crear
        await axios.post(
          `${environment.apiUrl}/items/servicio`,
          servicioData,
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Servicio actualizado' : 'Servicio guardado',
        message: this.esEdicion
          ? 'El servicio fue actualizado correctamente.'
          : 'El servicio fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error(
        this.esEdicion ? 'Error al actualizar el servicio:' : 'Error al guardar el servicio:',
        JSON.stringify(error.response?.data, null, 2) || error
      );

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion
          ? 'No fue posible actualizar el servicio. Revisa los datos y los permisos de actualización en Directus.'
          : 'No fue posible guardar el servicio. Revisa los datos y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
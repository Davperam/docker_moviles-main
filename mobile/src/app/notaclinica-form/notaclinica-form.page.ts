import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { NotaclinicaService } from '../services/notaclinica';

interface NotaClinicaGuardar {
  idexpediente: number;
  descripcion: string;
  observaciones: string;
  fecha: string;
}

interface ExpedienteClinico {
  idexpediente: number;
  [key: string]: any;
}

@Component({
  selector: 'app-notaclinica-form',
  templateUrl: './notaclinica-form.page.html',
  styleUrls: ['./notaclinica-form.page.scss'],
  standalone: false,
})
export class NotaclinicaFormPage implements OnInit {
  @Input() id?: number;

  notaForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;
  expedientes: ExpedienteClinico[] = [];

  mensajesValidacion: Record<string, Record<string, string>> = {
    idexpediente: {
      required: 'El expediente clínico es obligatorio.'
    },
    fecha: {
      required: 'La fecha es obligatoria.'
    },
    descripcion: {
      required: 'La descripción es obligatoria.',
      maxlength: 'La descripción no debe superar 500 caracteres.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private notaclinicaService: NotaclinicaService
  ) {}

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();
    await this.cargarExpedientes();

    if (this.esEdicion) {
      await this.cargarNota();
    }
  }

  private crearFormulario(): void {
    this.notaForm = this.formBuilder.group({
      idexpediente: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      observaciones: [''],
      fecha: ['', [Validators.required]]
    });
  }

  async cargarExpedientes(): Promise<void> {
    try {
      this.expedientes = await firstValueFrom(this.notaclinicaService.expedientes());
    } catch (error) {
      console.error('Error al cargar los expedientes clínicos:', error);
    }
  }

  private async cargarNota(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const data = await firstValueFrom(this.notaclinicaService.detalle(this.id));
      
      this.notaForm.patchValue({
        idexpediente: data.idexpediente,
        descripcion: data.descripcion,
        observaciones: data.observaciones,
        fecha: data.fecha
      });
    } catch (error) {
      console.error('Error al cargar la nota clínica:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos de la nota clínica. Revisa la conexión y los permisos de lectura en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
    }
  }

  getError(controlName: string): string {
    const control = this.notaForm.get(controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }

    const tipoError = Object.keys(control.errors)[0];

    return this.mensajesValidacion[controlName]?.[tipoError]
      ?? 'El valor ingresado no es válido.';
  }

  async cerrarModal(): Promise<void> {
    await this.modalController.dismiss({ guardado: false });
  }

  async guardarNota(): Promise<void> {
    if (this.notaForm.invalid) {
      this.notaForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.notaForm.value;

    const nota: NotaClinicaGuardar = {
      idexpediente: Number(valores.idexpediente),
      descripcion: valores.descripcion?.trim() ?? '',
      observaciones: valores.observaciones?.trim() ?? '',
      fecha: valores.fecha
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        await firstValueFrom(this.notaclinicaService.actualizar(this.id, nota));
      } else {
        await firstValueFrom(this.notaclinicaService.crear(nota));
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Nota clínica actualizada' : 'Nota clínica guardada',
        message: this.esEdicion 
          ? 'La nota clínica fue actualizada correctamente.' 
          : 'La nota clínica fue registrada correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error) {
      console.error(
        this.esEdicion ? 'Error al actualizar la nota clínica:' : 'Error al guardar la nota clínica:',
        error
      );

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion
          ? 'No fue posible actualizar la nota clínica. Revisa los datos, la conexión y los permisos de actualización en Directus.'
          : 'No fue posible guardar la nota clínica. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }
}
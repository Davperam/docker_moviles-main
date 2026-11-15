import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { OdontogramasService } from '../services/odontogramas';

interface OdontogramaGuardar {
  idexpediente: number;
  observaciones: string;
  diente: number;
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
  expedientesList: any[] = [];

  mensajesValidacion: Record<string, Record<string, string>> = {
    idexpediente: {
      required: 'Debe seleccionar un paciente de la lista.'
    },
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
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private odontogramasService: OdontogramasService
  ) { }

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();
    await this.cargarExpedientes();

    if (this.esEdicion) {
      await this.cargarOdontograma();
    }
  }

  private crearFormulario(): void {
    this.odontogramasForm = this.formBuilder.group({
      idexpediente: ['', [Validators.required]],
      observaciones: ['', [Validators.required, Validators.maxLength(150)]],
      diente: ['', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+$')]],
      tratamiento: ['', [Validators.required, Validators.maxLength(150)]],
      estado: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  async cargarExpedientes(): Promise<void> {
    try {
      this.expedientesList = await firstValueFrom(this.odontogramasService.expedientes());
    } catch (error) {
      console.error('Error al cargar la lista de expedientes:', error);
    }
  }

  getNombrePaciente(exp: any): string {
    if (exp?.idpaciente && typeof exp.idpaciente === 'object') {
      const { nombre = '', paterno = '', materno = '' } = exp.idpaciente;
      const nombreCompleto = `${nombre} ${paterno} ${materno}`.trim();
      return nombreCompleto ? `${nombreCompleto} (Exp. #${exp.idexpediente})` : `Expediente #${exp.idexpediente}`;
    }
    return `Expediente #${exp.idexpediente}`;
  }

  private async cargarOdontograma(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const o = await firstValueFrom(
        this.odontogramasService.detalle(this.id)
      );

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
        message: 'No fue posible cargar los datos del odontograma.',
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
    await this.modalController.dismiss({ guardado: false });
  }

  async guardarOdontogramas(): Promise<void> {
    if (this.odontogramasForm.invalid) {
      this.odontogramasForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.odontogramasForm.value;

    const odontograma: OdontogramaGuardar = {
      idexpediente: Number(valores.idexpediente),
      observaciones: valores.observaciones ? String(valores.observaciones).trim() : '',
      estado: valores.estado ? String(valores.estado).trim() : '',
      diente: Number(valores.diente) || 0,
      tratamiento: valores.tratamiento ? String(valores.tratamiento).trim() : ''
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        await firstValueFrom(this.odontogramasService.actualizar(this.id, odontograma));
      } else {
        await firstValueFrom(this.odontogramasService.crear(odontograma));
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Odontograma actualizado' : 'Odontograma guardado',
        message: this.esEdicion ? 'El odontograma fue actualizado correctamente.' : 'El odontograma fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Error al guardar el odontograma:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion ? 'No fue posible actualizar el odontograma.' : 'No fue posible guardar el odontograma.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { firstValueFrom } from 'rxjs';
import { AlergiasService } from '../services/alergia-service';

interface AlergiaGuardar {
  nombre: string;
  descripcion: string;
}

interface AlergiaDetalle {
  idalergia?: number;
  id?: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-alergia-form',
  templateUrl: './alergia-form.page.html',
  styleUrls: ['./alergia-form.page.scss'],
  standalone: false,
})
export class AlergiaFormPage implements OnInit {

  @Input() id?: number; // Recibe el ID si estamos editando

  alergiaForm!: FormGroup;
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
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private alergiaService: AlergiasService
  ) {}

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();

    if (this.esEdicion) {
      await this.cargarAlergia();
    }
  }

  private crearFormulario(): void {
    this.alergiaForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      descripcion: ['', [
        Validators.required,
      ]],
    });
  }

  getError(controlName: string): string {
    const control = this.alergiaForm.get(controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }

    const tipoError = Object.keys(control.errors)[0];

    return this.mensajesValidacion[controlName]?.[tipoError]
      ?? 'El valor ingresado no es válido.';
  }

  private async cargarAlergia(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const alergia = await firstValueFrom(this.alergiaService.detalle(this.id));

      this.alergiaForm.patchValue({
        nombre: alergia.nombre,
        descripcion: alergia.descripcion
      });
    } catch (error) {
      console.error('Error al cargar la alergia:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos de la alergia. Revisa la conexión y los permisos de lectura en Directus.',
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

  async guardarAlergia(): Promise<void> {
    if (this.alergiaForm.invalid) {
      this.alergiaForm.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const valores = this.alergiaForm.value;

    const alergia: AlergiaGuardar = {
      nombre: valores.nombre.trim(),
      descripcion: valores.descripcion?.trim() ?? '',
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        await firstValueFrom(this.alergiaService.actualizar(this.id, alergia));
      } else {
        await firstValueFrom(this.alergiaService.crear(alergia));
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Alergia actualizada' : 'Alergia guardada',
        message: this.esEdicion ? 'La alergia fue actualizada correctamente.' : 'La alergia fue registrada correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({
        guardado: true
      });
    } catch (error) {
      console.error('Error al guardar la alergia:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion
          ? 'No fue posible actualizar la alergia. Revisa los datos y permisos.'
          : 'No fue posible guardar la alergia. Revisa los datos y permisos.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
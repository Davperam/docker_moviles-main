import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface MedicamentoGuardar {
  nombre: string;
  descripcion: string;
  activo: number;
}

interface MedicamentoDetalle {
  idmedicamento?: number;
  id?: number;
  nombre: string;
  descripcion: string;
  activo: number;
}

@Component({
  selector: 'app-medicamentos-form',
  templateUrl: './medicamentos-form.page.html',
  styleUrls: ['./medicamentos-form.page.scss'],
  standalone: false,
})
export class MedicamentosFormPage implements OnInit {

  @Input() id?: number; // <-- Recibe el ID si estamos editando

  medicamentoForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    nombre: {
      required: 'El nombre es obligatorio.',
      maxlength: 'El nombre no debe superar 150 caracteres.'
    },
    descripcion: {
      required: 'La descripción es obligatoria.'
    },
    activo: {
      required: 'El campo activo es obligatorio.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController
  ) { }

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();

    if (this.esEdicion) {
      await this.cargarMedicamento();
    }
  }

  private crearFormulario(): void {
    this.medicamentoForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      descripcion: ['', [
        Validators.required
      ]],
      activo: [1, [
        Validators.required
      ]]
    });
  }

  private async cargarMedicamento(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const response = await axios.get<{ data: MedicamentoDetalle }>(
        `${environment.apiUrl}/items/medicamento/${this.id}`
      );
      const med = response.data.data;

      this.medicamentoForm.patchValue({
        nombre: med.nombre,
        descripcion: med.descripcion,
        activo: med.activo
      });
    } catch (error) {
      console.error('Error al cargar el medicamento:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del medicamento.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
    }
  }

  getError(controlName: string): string {
    const control = this.medicamentoForm.get(controlName);

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

  async guardarMedicamento(): Promise<void> {
    if (this.medicamentoForm.invalid) {
      this.medicamentoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;

    const valores = this.medicamentoForm.value;

    const medicamento: MedicamentoGuardar = {
      nombre: valores.nombre ? String(valores.nombre).trim() : '',
      descripcion: valores.descripcion ? String(valores.descripcion).trim() : '',
      activo: Number(valores.activo) || 1
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        await axios.patch(
          `${environment.apiUrl}/items/medicamento/${this.id}`,
          medicamento,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      } else {
        await axios.post(
          `${environment.apiUrl}/items/medicamento`,
          medicamento,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Medicamento actualizado' : 'Medicamento guardado',
        message: this.esEdicion ? 'El medicamento fue actualizado correctamente.' : 'El medicamento fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({
        guardado: true
      });
    } catch (error) {
      console.error('Error al guardar el medicamento:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion ? 'No fue posible actualizar el medicamento.' : 'No fue posible guardar el medicamento. Revisa los datos, la conexión y los permisos en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
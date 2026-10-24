import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface AlergiaCrear {
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

  alergiaForm!: FormGroup;
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
  private modalController: ModalController
) {}

ngOnInit(): void {
  this.crearFormulario();
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

  const alergia: AlergiaCrear = {
    nombre: valores.nombre.trim(),
    descripcion: valores.descripcion?.trim() ?? '',
  };

  try {
    await axios.post(
      `${environment.apiUrl}/items/alergia`,
      alergia,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const alerta = await this.alertController.create({
      header: 'Alergia guardado',
      message: 'La alergia fue registrada correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.modalController.dismiss({
      guardado: true
    });
  } catch (error) {
    console.error('Error al guardar el producto:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible guardar la alergia. Revisa los datos, la conexión y los permisos de creación en Directus.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  } finally {
    this.guardando = false;
  }
}

}

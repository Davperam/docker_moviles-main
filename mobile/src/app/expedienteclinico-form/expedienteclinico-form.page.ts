import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface ExpedienteClinicoCrear {
  idpaciente: number;
  enfermedades: string;
  observaciones: string;
}

@Component({
  selector: 'app-expedienteclinico-form',
  templateUrl: './expedienteclinico-form.page.html',
  styleUrls: ['./expedienteclinico-form.page.scss'],
  standalone: false,
})
export class ExpedienteclinicoFormPage implements OnInit {

  expedienteclinicoForm!: FormGroup;
guardando: boolean = false;

mensajesValidacion: Record<string, Record<string, string>> = {
  enfermedades: {
    required: 'La enfermedad es obligatoria.',
    maxlength: 'El nombre no debe superar 150 caracteres.'
  },
  observaciones: {
    required: 'La observación es obligatoria.',
    maxlength: 'El nombre no debe superar 150 caracteres.'
  },
  idpaciente: {
    required: 'El id del paciente es obligatorio.',
    min: 'El stock debe ser igual o mayor que cero.',
    pattern: 'El stock debe contener únicamente números enteros.'
  }
};

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  private crearFormulario(): void {
  this.expedienteclinicoForm = this.formBuilder.group({
    enfermedades: ['', [
      Validators.required,
      Validators.maxLength(150)
    ]],
    observaciones: ['', [
      Validators.required,
      Validators.maxLength(150)
    ]],
    idpaciente: ['', [
      Validators.required,
      Validators.min(0),
      Validators.pattern('^[0-9]+$')
    ]]
  });
}

getError(controlName: string): string {
  const control = this.expedienteclinicoForm.get(controlName);

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


async guardarExpediente(): Promise<void> {
  if (this.expedienteclinicoForm.invalid) {
    this.expedienteclinicoForm.markAllAsTouched();
    return;
  }

  this.guardando = true;

  const valores = this.expedienteclinicoForm.value;

  const expedienteclinico: ExpedienteClinicoCrear = {
    enfermedades: valores.enfermedades.trim(),
    observaciones: valores.observaciones?.trim() ?? '',
    idpaciente: Number(valores.stock)
  };

  try {
    await axios.post(
      `${environment.apiUrl}/items/expedienteclinico`,
      expedienteclinico,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const alerta = await this.alertController.create({
      header: 'Expediente guardado',
      message: 'El expediente clinico fue registrado correctamente.',
      buttons: ['Aceptar']
    });

    await alerta.present();
    await alerta.onDidDismiss();

    await this.modalController.dismiss({
      guardado: true
    });
  } catch (error) {
    console.error('Error al guardar el expediente:', error);

    const alerta = await this.alertController.create({
      header: 'Error',
      message: 'No fue posible guardar el expediente. Revisa los datos, la conexión y los permisos de creación en Directus.',
      buttons: ['Aceptar']
    });

    await alerta.present();
  } finally {
    this.guardando = false;
  }
}

}

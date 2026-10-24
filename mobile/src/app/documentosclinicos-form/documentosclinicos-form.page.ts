import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface DocumentoCrear {
  iddocumento: number;
  idexpediente: number;
  nombredocumento: string;
  rutaarchivo: string;
  tipodocumento: string;
  activo: number;
}

@Component({
  selector: 'app-documentosclinicos-form',
  templateUrl: './documentosclinicos-form.page.html',
  styleUrls: ['./documentosclinicos-form.page.scss'],
  standalone: false,
})
export class DocumentosclinicosFormPage implements OnInit {

  documentoForm!: FormGroup;
  guardando: boolean = false;
  
  // Arreglo para almacenar los expedientes que vienen de Directus
  expedientesList: any[] = [];

  mensajesValidacion: Record<string, Record<string, string>> = {
    idexpediente: {
      required: 'El expediente es obligatorio.'
    },
    nombredocumento: {
      required: 'El nombre del documento es obligatorio.',
      maxlength: 'El nombre no debe superar los 100 caracteres.'
    },
    rutaarchivo: {
      required: 'La ruta del archivo es obligatoria.'
    },
    tipodocumento: {
      required: 'El tipo de documento es obligatorio.',
      maxlength: 'El tipo de documento no debe superar los 100 caracteres.'
    },
    activo: {
      required: 'El campo activo es obligatorio.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.cargarExpedientes(); // <-- Cargamos la lista de expedientes al iniciar
  }

  private crearFormulario(): void {
    this.documentoForm = this.formBuilder.group({
      idexpediente: ['', [Validators.required]],
      nombredocumento: ['', [Validators.required, Validators.maxLength(100)]],
      rutaarchivo: ['', [Validators.required]],
      tipodocumento: ['', [Validators.required, Validators.maxLength(100)]],
      activo: [1, [Validators.required]]
    });
  }

  // Método para obtener los expedientes desde Directus
  async cargarExpedientes(): Promise<void> {
    try {
      const response = await axios.get(`${environment.apiUrl}/items/expedienteclinico`);
      this.expedientesList = response.data.data;
    } catch (error) {
      console.error('Error al cargar la lista de expedientes:', error);
    }
  }

  getError(controlName: string): string {
    const control = this.documentoForm.get(controlName);
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }
    const tipoError = Object.keys(control.errors)[0];
    return this.mensajesValidacion[controlName]?.[tipoError] ?? 'El valor ingresado no es válido.';
  }

  async cerrarModal(): Promise<void> {
    await this.modalController.dismiss({ guardado: false });
  }

  async guardarDocumento(): Promise<void> {
    if (this.documentoForm.invalid) {
      this.documentoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.documentoForm.value;

    const documento: Partial<DocumentoCrear> = {
      idexpediente: Number(valores.idexpediente) || 0,
      nombredocumento: valores.nombredocumento?.trim() ?? '',
      rutaarchivo: valores.rutaarchivo?.trim() ?? '',
      tipodocumento: valores.tipodocumento?.trim() ?? '',
      activo: Number(valores.activo) || 1
    };

    try {
      await axios.post(
        `${environment.apiUrl}/items/documentoclinico`,
        documento,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const alerta = await this.alertController.create({
        header: 'Documento guardado',
        message: 'El documento clínico fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Error al guardar el documento:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible guardar el documento clínico. Revisa los datos en la consola.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
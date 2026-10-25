import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface DocumentoGuardar {
  idexpediente: number;
  nombredocumento: string;
  rutaarchivo: string;
  tipodocumento: string;
  activo: number;
}

interface DocumentoDetalle {
  iddocumento?: number;
  id?: number;
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

  @Input() id?: number; // Recibe el ID si estamos editando

  documentoForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;
  
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

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();
    await this.cargarExpedientes();

    if (this.esEdicion) {
      await this.cargarDocumento();
    }
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

  async cargarExpedientes(): Promise<void> {
    try {
      const response = await axios.get(`${environment.apiUrl}/items/expedienteclinico`);
      this.expedientesList = response.data.data;
    } catch (error) {
      console.error('Error al cargar la lista de expedientes:', error);
    }
  }

  private async cargarDocumento(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const response = await axios.get<{ data: DocumentoDetalle }>(
        `${environment.apiUrl}/items/documentoclinico/${this.id}`
      );
      const doc = response.data.data;

      this.documentoForm.patchValue({
        idexpediente: doc.idexpediente,
        nombredocumento: doc.nombredocumento,
        rutaarchivo: doc.rutaarchivo,
        tipodocumento: doc.tipodocumento,
        activo: doc.activo
      });
    } catch (error) {
      console.error('Error al cargar el documento clínico:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del documento. Revisa la conexión y los permisos de lectura en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
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

    const documento: DocumentoGuardar = {
      idexpediente: Number(valores.idexpediente) || 0,
      nombredocumento: valores.nombredocumento?.trim() ?? '',
      rutaarchivo: valores.rutaarchivo?.trim() ?? '',
      tipodocumento: valores.tipodocumento?.trim() ?? '',
      activo: Number(valores.activo) || 1
    };

    try {
      if (this.esEdicion && this.id !== undefined) {
        await axios.patch(
          `${environment.apiUrl}/items/documentoclinico/${this.id}`,
          documento,
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        await axios.post(
          `${environment.apiUrl}/items/documentoclinico`,
          documento,
          { headers: { 'Content-Type': 'application/json' } }
        );
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Documento actualizado' : 'Documento guardado',
        message: this.esEdicion ? 'El documento clínico fue actualizado correctamente.' : 'El documento clínico fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Error al guardar el documento:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion ? 'No fue posible actualizar el documento.' : 'No fue posible guardar el documento clínico.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
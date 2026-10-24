import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface PagoCrear {
  idcita: number;
  idmetodopago: number;
  total: number;
  fechapago: string;
  estado: string; // Cambiado a string ('pagado', 'pendiente', 'cancelado')
  observaciones: string;
}

@Component({
  selector: 'app-pagos-form',
  templateUrl: './pagos-form.page.html',
  styleUrls: ['./pagos-form.page.scss'],
  standalone: false,
})
export class PagosFormPage implements OnInit {

  pagoForm!: FormGroup;
  guardando: boolean = false;

  citasList: any[] = [];
  metodoPagosList: any[] = [];

  mensajesValidacion: Record<string, Record<string, string>> = {
    idcita: { 
      required: 'La cita es obligatoria.' 
    },
    idmetodopago: { 
      required: 'El método de pago es obligatorio.' 
    },
    total: { 
      required: 'El total es obligatorio.',
      min: 'El total debe ser igual o mayor a 0.' 
    },
    fechapago: { 
      required: 'La fecha de pago es obligatoria.' 
    },
    estado: { 
      required: 'El estado es obligatorio.' 
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.crearFormulario();
    this.cargarCatalogos();
  }

  private crearFormulario(): void {
    this.pagoForm = this.formBuilder.group({
      idcita: ['', [Validators.required]],
      idmetodopago: ['', [Validators.required]],
      total: ['', [Validators.required, Validators.min(0)]],
      fechapago: ['', [Validators.required]],
      estado: ['Pendiente', [Validators.required]], // Inicializado por defecto en 'pendiente'
      observaciones: ['']
    });
  }

  async cargarCatalogos(): Promise<void> {
    try {
      const [resCitas, resMetodos] = await Promise.all([
        axios.get(`${environment.apiUrl}/items/cita`),
        axios.get(`${environment.apiUrl}/items/metodopago`)
      ]);

      this.citasList = resCitas.data.data;
      this.metodoPagosList = resMetodos.data.data;
    } catch (error) {
      console.error('Error al cargar los catálogos de pagos:', error);
    }
  }

  getError(controlName: string): string {
    const control = this.pagoForm.get(controlName);

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

  async guardarPago(): Promise<void> {
    if (this.pagoForm.invalid) {
      this.pagoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.pagoForm.value;

    const pagoData: PagoCrear = {
      idcita: Number(valores.idcita),
      idmetodopago: Number(valores.idmetodopago),
      total: Number(valores.total) || 0,
      fechapago: valores.fechapago ? String(valores.fechapago).trim() : '',
      estado: valores.estado ? String(valores.estado).trim() : 'pendiente',
      observaciones: valores.observaciones ? String(valores.observaciones).trim() : ''
    };

    try {
      await axios.post(
        `${environment.apiUrl}/items/pago`,
        pagoData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const alerta = await this.alertController.create({
        header: 'Pago guardado',
        message: 'El pago fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Error al guardar el pago:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible guardar el pago. Revisa los datos y permisos en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
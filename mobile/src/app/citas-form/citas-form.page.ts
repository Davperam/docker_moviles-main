import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { environment } from '../../environments/environment';

interface CitaCrear {
  idpaciente: number;
  iddentista: number;
  idestadocita: number;
  fecha: string;
  horainicio: string;
  horafin: string;
  motivo: string;
  observaciones: string;
}

interface CitaDetalleCrear {
  idcita: number;
  idservicio: number;
  cantidad: number;
  precio: number;
  observaciones: string;
}

@Component({
  selector: 'app-citas-form',
  templateUrl: './citas-form.page.html',
  styleUrls: ['./citas-form.page.scss'],
  standalone: false,
})
export class CitasFormPage implements OnInit {

  citaForm!: FormGroup;
  guardando: boolean = false;

  pacientesList: any[] = [];
  dentistasList: any[] = [];
  estadoCitasList: any[] = [];
  serviciosList: any[] = []; // <-- Lista para los servicios

  mensajesValidacion: Record<string, Record<string, string>> = {
    idpaciente: { required: 'El paciente es obligatorio.' },
    iddentista: { required: 'El dentista es obligatorio.' },
    idestadocita: { required: 'El estado de la cita es obligatorio.' },
    idservicio: { required: 'El servicio a realizar es obligatorio.' }, // <-- Mensaje de validación
    fecha: { required: 'La fecha es obligatoria.' },
    horainicio: { required: 'La hora de inicio es obligatoria.' },
    horafin: { required: 'La hora de fin es obligatoria.' },
    motivo: { required: 'El motivo de la cita es obligatorio.' }
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
    this.citaForm = this.formBuilder.group({
      idpaciente: ['', [Validators.required]],
      iddentista: ['', [Validators.required]],
      idestadocita: ['', [Validators.required]],
      idservicio: ['', [Validators.required]], // <-- Campo agregado al formulario
      fecha: ['', [Validators.required]],
      horainicio: ['', [Validators.required]],
      horafin: ['', [Validators.required]],
      motivo: ['', [Validators.required]],
      observaciones: ['']
    });
  }

  async cargarCatalogos(): Promise<void> {
    try {
      const [resPacientes, resDentistas, resEstados, resServicios] = await Promise.all([
        axios.get(`${environment.apiUrl}/items/paciente`),
        axios.get(`${environment.apiUrl}/items/dentista`),
        axios.get(`${environment.apiUrl}/items/estadocita`),
        axios.get(`${environment.apiUrl}/items/servicio`) // <-- Cargamos también los servicios
      ]);

      this.pacientesList = resPacientes.data.data;
      this.dentistasList = resDentistas.data.data;
      this.estadoCitasList = resEstados.data.data;
      this.serviciosList = resServicios.data.data;
    } catch (error) {
      console.error('Error al cargar los catálogos:', error);
    }
  }

  getError(controlName: string): string {
    const control = this.citaForm.get(controlName);
    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }
    const tipoError = Object.keys(control.errors)[0];
    return this.mensajesValidacion[controlName]?.[tipoError] ?? 'El valor ingresado no es válido.';
  }

  async cerrarModal(): Promise<void> {
    await this.modalController.dismiss({ guardado: false });
  }

  async guardarCita(): Promise<void> {
    if (this.citaForm.invalid) {
      this.citaForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.citaForm.value;

    // Buscamos el precio del servicio seleccionado para guardarlo en el detalle
    const servicioSeleccionado = this.serviciosList.find(s => s.idservicio === Number(valores.idservicio));
    const precioServicio = servicioSeleccionado ? Number(servicioSeleccionado.precio) : 0;

    const citaData: CitaCrear = {
      idpaciente: Number(valores.idpaciente),
      iddentista: Number(valores.iddentista),
      idestadocita: Number(valores.idestadocita),
      fecha: valores.fecha?.trim() ?? '',
      horainicio: valores.horainicio?.trim() ?? '',
      horafin: valores.horafin?.trim() ?? '',
      motivo: valores.motivo?.trim() ?? '',
      observaciones: valores.observaciones?.trim() ?? ''
    };

    try {
      // 1. Guardar la cita principal en Directus
      const responseCita = await axios.post(
        `${environment.apiUrl}/items/cita`,
        citaData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Obtenemos el ID de la cita recién creada
      const citaCreada = responseCita.data.data;
      const idCitaGenerada = citaCreada.idcita || citaCreada.id;

      // 2. Si se generó la cita y hay un servicio seleccionado, guardamos el detalle automáticamente
      if (idCitaGenerada && valores.idservicio) {
        const detalleData: CitaDetalleCrear = {
          idcita: Number(idCitaGenerada),
          idservicio: Number(valores.idservicio),
          cantidad: 1,
          precio: precioServicio,
          observaciones: valores.observaciones?.trim() ?? ''
        };

        await axios.post(
          `${environment.apiUrl}/items/citadetalle`,
          detalleData,
          { headers: { 'Content-Type': 'application/json' } }
        );
      }

      const alerta = await this.alertController.create({
        header: 'Cita guardada',
        message: 'La cita y su servicio fueron registrados correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Error al guardar la cita:', error.response?.data || error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible guardar la cita. Revisa los datos en la consola.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }

}
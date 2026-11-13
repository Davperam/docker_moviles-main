import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import axios from 'axios';
import { environment } from '../../environments/environment';
import { CitasService } from '../services/citas';

interface CitaGuardar {
  idpaciente: number;
  iddentista: number;
  idestadocita: number;
  fecha: string;
  horainicio: string;
  horafin: string;
  motivo: string;
  observaciones: string;
}

interface CitaDetalleGuardar {
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

  @Input() id?: number;

  citaForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  pacientesList: any[] = [];
  dentistasList: any[] = [];
  estadoCitasList: any[] = [];
  serviciosList: any[] = [];

  mensajesValidacion: Record<string, Record<string, string>> = {
    idpaciente: { required: 'El paciente es obligatorio.' },
    iddentista: { required: 'El dentista es obligatorio.' },
    idestadocita: { required: 'El estado de la cita es obligatorio.' },
    idservicio: { required: 'El servicio a realizar es obligatorio.' },
    fecha: { required: 'La fecha es obligatoria.' },
    horainicio: { required: 'La hora de inicio es obligatoria.' },
    horafin: { required: 'La hora de fin es obligatoria.' },
    motivo: { required: 'El motivo de la cita es obligatorio.' }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private citasService: CitasService
  ) { }

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();
    await this.cargarCatalogos();

    if (this.esEdicion) {
      await this.cargarCitaUnica();
    }
  }

  private crearFormulario(): void {
    this.citaForm = this.formBuilder.group({
      idpaciente: ['', [Validators.required]],
      iddentista: ['', [Validators.required]],
      idestadocita: ['', [Validators.required]],
      idservicio: ['', [Validators.required]],
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
        axios.get(`${environment.apiUrl}/items/servicio`)
      ]);

      this.pacientesList = resPacientes.data.data;
      this.dentistasList = resDentistas.data.data;
      this.estadoCitasList = resEstados.data.data;
      this.serviciosList = resServicios.data.data;
    } catch (error) {
      console.error('Error al cargar los catálogos:', error);
    }
  }

  private async cargarCitaUnica(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const cita = await firstValueFrom(this.citasService.detalle(this.id));

      let servicioId = '';
      try {
        const resDetalle = await axios.get(
          `${environment.apiUrl}/items/citadetalle?filter[idcita][_eq]=${this.id}`
        );
        const detalles = resDetalle.data.data;
        if (detalles && detalles.length > 0) {
          servicioId = detalles[0].idservicio;
        }
      } catch (e) {
        console.warn('No se pudo cargar el detalle del servicio:', e);
      }

      this.citaForm.patchValue({
        idpaciente: cita.idpaciente,
        iddentista: cita.iddentista,
        idestadocita: cita.idestadocita,
        idservicio: servicioId,
        fecha: cita.fecha,
        horainicio: cita.horainicio,
        horafin: cita.horafin,
        motivo: cita.motivo,
        observaciones: cita.observaciones
      });
    } catch (error) {
      console.error('Error al cargar la cita:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos de la cita.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
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

    const servicioSeleccionado = this.serviciosList.find(s => s.idservicio === Number(valores.idservicio));
    const precioServicio = servicioSeleccionado ? Number(servicioSeleccionado.precio) : 0;

    const citaData: CitaGuardar = {
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
      if (this.esEdicion && this.id !== undefined) {
        await firstValueFrom(this.citasService.actualizar(this.id, citaData));

        if (valores.idservicio) {
          const resDetalle = await axios.get(
            `${environment.apiUrl}/items/citadetalle?filter[idcita][_eq]=${this.id}`
          );
          const detalles = resDetalle.data.data;

          const detalleData: CitaDetalleGuardar = {
            idcita: Number(this.id),
            idservicio: Number(valores.idservicio),
            cantidad: 1,
            precio: precioServicio,
            observaciones: valores.observaciones?.trim() ?? ''
          };

          if (detalles && detalles.length > 0) {
            const idDetalle = detalles[0].iddetallecita || detalles[0].id;
            await axios.patch(
              `${environment.apiUrl}/items/citadetalle/${idDetalle}`,
              detalleData
            );
          } else {
            await axios.post(
              `${environment.apiUrl}/items/citadetalle`,
              detalleData
            );
          }
        }
      } else {
        const citaCreada = await firstValueFrom(this.citasService.crear(citaData));
        const idCitaGenerada = citaCreada.idcita || (citaCreada as any).id;

        if (idCitaGenerada && valores.idservicio) {
          const detalleData: CitaDetalleGuardar = {
            idcita: Number(idCitaGenerada),
            idservicio: Number(valores.idservicio),
            cantidad: 1,
            precio: precioServicio,
            observaciones: valores.observaciones?.trim() ?? ''
          };

          await axios.post(
            `${environment.apiUrl}/items/citadetalle`,
            detalleData
          );
        }
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Cita actualizada' : 'Cita guardada',
        message: this.esEdicion ? 'La cita fue actualizada correctamente.' : 'La cita y su servicio fueron registrados correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Error al guardar la cita:', error);

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
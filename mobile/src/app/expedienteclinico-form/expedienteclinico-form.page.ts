import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { ExpedienteClinicoGuardar, ExpedienteclinicoService } from '../services/expedienteclinico';
import { Alergia, AlergiasService } from '../services/alergia-service';

interface PacienteOpcion {
  id?: number;
  idpaciente?: number;
  nombre: string;
  paterno: string;
  materno: string;
}

@Component({
  selector: 'app-expedienteclinico-form',
  templateUrl: './expedienteclinico-form.page.html',
  styleUrls: ['./expedienteclinico-form.page.scss'],
  standalone: false,
})
export class ExpedienteclinicoFormPage implements OnInit {


  @Input() id?: number;

  alergias: Alergia[] = [];
  enlacesAlergias: { id: number; alergiaId: number }[] = [];
  mensajeAlergias = '';

  expedienteclinicoForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  pacientes: PacienteOpcion[] = [];

  mensajesValidacion: Record<string, Record<string, string>> = {
    idpaciente: {
      required: 'Debe seleccionar un paciente de la lista.'
    },
    enfermedades: {
      required: 'La enfermedad es obligatoria.',
      maxlength: 'El texto no debe superar 150 caracteres.'
    },
    observaciones: {
      required: 'La observación es obligatoria.',
      maxlength: 'El texto no debe superar 150 caracteres.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private expedientesService: ExpedienteclinicoService,
    private alergiasService: AlergiasService,
  ) { }

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();
    await this.cargarAlergias();
    await this.cargarPacientes();

    if (this.esEdicion) {
      await this.cargarExpediente();
    }
  }

  private crearFormulario(): void {
    this.expedienteclinicoForm = this.formBuilder.group({
      idpaciente: ['', [Validators.required]],
      enfermedades: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]],
      observaciones: ['', [
        Validators.required,
        Validators.maxLength(150)
      ]]
    }); this.expedienteclinicoForm.addControl('alergias', this.formBuilder.array([]));
  }

    get alergiasFA(): FormArray {
    return this.expedienteclinicoForm.get('alergias') as FormArray;
  }

  agregarAlergia(): void {
    this.alergiasFA.push(new FormControl(null, Validators.required));
  }

  eliminarAlergia(indice: number): void {
    this.alergiasFA.removeAt(indice);
  }

  private async cargarAlergias(): Promise<void> {
    try {
      this.alergias = await firstValueFrom(this.alergiasService.catalogo());
    } catch {
      this.mensajeAlergias = 'No fue posible cargar el catálogo de alergias.';
    }
  }


  private async cargarPacientes(): Promise<void> {
    try {
      this.pacientes = await firstValueFrom(this.expedientesService.pacientes());
    } catch (error) {
      console.error('Error al cargar la lista de pacientes:', error);
    }
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

  private async cargarExpediente(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const expediente = await firstValueFrom(this.expedientesService.detalle(this.id));

      this.enlacesAlergias = (expediente.alergias ?? []).map(enlace => ({
        id: enlace.idexpedientealergia,
        alergiaId: enlace.idalergia.idalergia
      }));
      this.alergiasFA.clear();
      for (const enlace of this.enlacesAlergias) {
        this.alergiasFA.push(new FormControl(enlace.alergiaId, Validators.required));
      }

      const idPacienteVal = typeof expediente.idpaciente === 'object' && expediente.idpaciente !== null
        ? (expediente.idpaciente.id ?? expediente.idpaciente.idpaciente)
        : expediente.idpaciente;

      this.expedienteclinicoForm.patchValue({
        idpaciente: idPacienteVal,
        enfermedades: expediente.enfermedades,
        observaciones: expediente.observaciones
      });
    } catch (error) {
      console.error('Error al cargar el expediente clínico:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del expediente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.cargando = false;
    }
  }

  async cerrarModal(): Promise<void> {
    await this.modalController.dismiss({ guardado: false });
  }

  async guardarExpediente(): Promise<void> {
    if (this.expedienteclinicoForm.invalid) {
      this.expedienteclinicoForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.expedienteclinicoForm.value;

    const fechaHoy = new Date().toISOString().split('T')[0];

    const expedienteclinico: ExpedienteClinicoGuardar = {
      idpaciente: Number(valores.idpaciente),
      enfermedades: valores.enfermedades.trim(),
      observaciones: valores.observaciones?.trim() ?? ''
    };

    const ids = [...new Set(this.alergiasFA.value.map(Number))] as number[];
    if (this.esEdicion) {
      const anteriores = new Set(this.enlacesAlergias.map(enlace => enlace.alergiaId));
      expedienteclinico.alergias = {
        create: ids.filter(id => !anteriores.has(id)).map(id => ({ idalergia: id })),
        delete: this.enlacesAlergias
          .filter(enlace => !ids.includes(enlace.alergiaId))
          .map(enlace => enlace.id)
      };
    } else {
      expedienteclinico.alergias = ids.map(id => ({ idalergia: id }));
    }

    if (!this.esEdicion) {
      expedienteclinico.apertura = fechaHoy;
    }

    try {
      if (this.esEdicion && this.id !== undefined) {
        await firstValueFrom(this.expedientesService.actualizar(this.id, expedienteclinico));
      } else {
        await firstValueFrom(this.expedientesService.crear(expedienteclinico));
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Expediente actualizado' : 'Expediente guardado',
        message: this.esEdicion
          ? 'El expediente clínico fue actualizado correctamente.'
          : 'El expediente clínico fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error('Detalle completo del error:', error.response?.data || error);

      const mensajeDirectus = error.response?.data?.errors?.[0]?.message;

      const alerta = await this.alertController.create({
        header: 'Error al guardar',
        message: mensajeDirectus 
          ? `Directus: ${mensajeDirectus}` 
          : 'No fue posible guardar los cambios. Revisa la consola y los permisos.',
        buttons: ['Aceptar']
      });
      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }
}
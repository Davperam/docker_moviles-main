import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray,FormControl} from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { DentistasService, DentistaGuardar } from '../services/dentistas';
import { Especialidad, EspecialidadService } from '../services/especialidad';


@Component({
  selector: 'app-dentistas-form',
  templateUrl: './dentistas-form.page.html',
  styleUrls: ['./dentistas-form.page.scss'],
  standalone: false,
})
export class DentistasFormPage implements OnInit {

  @Input() id?: number;


  especialidades: Especialidad[] = [];
  enlacesEspecialidades: { id: number; especialidadId: number }[] = [];
  mensajeEspecialidades = '';

  dentistaForm!: FormGroup;
  cargando: boolean = false;
  guardando: boolean = false;

  mensajesValidacion: Record<string, Record<string, string>> = {
    nombre: {
      required: 'El nombre es obligatorio.',
      maxlength: 'El nombre no debe superar los 50 caracteres.'
    },
    paterno: {
      required: 'El apellido paterno es obligatorio.',
      maxlength: 'El apellido no debe superar los 50 caracteres.'
    },
    materno: {
      maxlength: 'El apellido materno no debe superar los 50 caracteres.'
    },
    cedula: {
      required: 'La cédula profesional es obligatoria.'
    },
    telefono: {
      required: 'El teléfono es obligatorio.',
      maxlength: 'El teléfono no debe superar los 10 dígitos.',
      pattern: 'El teléfono debe contener solo números.'
    },
    correo: {
      required: 'El correo electrónico es obligatorio.',
      email: 'Ingresa un correo electrónico válido.',
      maxlength: 'El correo no debe superar los 150 caracteres.'
    },
    activo: {
      required: 'El campo activo es obligatorio.'
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private modalController: ModalController,
    private dentistasService: DentistasService,
    private especialidadesService: EspecialidadService
  ) { }

  get esEdicion(): boolean {
    return this.id !== undefined;
  }

  async ngOnInit(): Promise<void> {
    this.crearFormulario();
    await this.cargarEspecialidades();

    if (this.esEdicion) {
      await this.cargarDentista();
    }
  }

  private crearFormulario(): void {
    this.dentistaForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      paterno: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      materno: ['', [
        Validators.maxLength(50)
      ]],
      cedula: ['', [
        Validators.required
      ]],
      telefono: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[0-9]+$')
      ]],
      correo: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(150)
      ]],
      activo: [1, [
        Validators.required
      ]]
    });this.dentistaForm.addControl('especialidades', this.formBuilder.array([]));
  }

    get especialidadesFA(): FormArray {
    return this.dentistaForm.get('especialidades') as FormArray;
  }

  agregarEspecialidad(): void {
    this.especialidadesFA.push(new FormControl(null, Validators.required));
  }

  eliminarEspecialidad(indice: number): void {
    this.especialidadesFA.removeAt(indice);
  }

  private async cargarEspecialidades(): Promise<void> {
    try {
      this.especialidades = await firstValueFrom(this.especialidadesService.catalogo());
    } catch {
      this.mensajeEspecialidades = 'No fue posible cargar el catálogo de especialidades.';
    }
  }

  getError(controlName: string): string {
    const control = this.dentistaForm.get(controlName);

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return '';
    }

    const tipoError = Object.keys(control.errors)[0];

    return this.mensajesValidacion[controlName]?.[tipoError]
      ?? 'El valor ingresado no es válido.';
  }

  private async cargarDentista(): Promise<void> {
    if (this.id === undefined) {
      return;
    }

    this.cargando = true;

    try {
      const dentista = await firstValueFrom(this.dentistasService.detalle(this.id));

      this.enlacesEspecialidades = (dentista.especialidades ?? []).map(enlace => ({
        id: enlace.iddentistaespecialidad,
        especialidadId: enlace.idespecialidad.idespecialidad
      }));
      this.especialidadesFA.clear();
      for (const enlace of this.enlacesEspecialidades) {
        this.especialidadesFA.push(new FormControl(enlace.especialidadId, Validators.required));
      }

      this.dentistaForm.patchValue({
        nombre: dentista.nombre,
        paterno: dentista.paterno,
        materno: dentista.materno,
        cedula: dentista.cedula,
        telefono: dentista.telefono,
        correo: dentista.correo,
        activo: dentista.activo !== undefined ? dentista.activo : 1
      });
    } catch (error) {
      console.error('Error al cargar el dentista:', error);

      const alerta = await this.alertController.create({
        header: 'Error',
        message: 'No fue posible cargar los datos del dentista. Revisa la conexión, el identificador y los permisos de lectura en Directus.',
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

  async guardarDentista(): Promise<void> {
    if (this.dentistaForm.invalid) {
      this.dentistaForm.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const valores = this.dentistaForm.value;

    const dentista: DentistaGuardar = {
      nombre: valores.nombre ? String(valores.nombre).trim() : '',
      paterno: valores.paterno ? String(valores.paterno).trim() : '',
      materno: valores.materno ? String(valores.materno).trim() : '',
      cedula: valores.cedula ? String(valores.cedula).trim() : '',
      telefono: valores.telefono ? String(valores.telefono).trim() : '',
      correo: valores.correo ? String(valores.correo).trim() : '',
      activo: Number(valores.activo) || 1
    };

    const ids = [...new Set(this.especialidadesFA.value.map(Number))] as number[];
      if (this.esEdicion) {
        const anteriores = new Set(this.enlacesEspecialidades.map(enlace => enlace.especialidadId));
        dentista.especialidades = {
          create: ids.filter(id => !anteriores.has(id)).map(id => ({ idespecialidad: id })),
          delete: this.enlacesEspecialidades
            .filter(enlace => !ids.includes(enlace.especialidadId))
            .map(enlace => enlace.id)
        };
      } else {
        dentista.especialidades = ids.map(id => ({ idespecialidad: id }));
      }

    try {
      if (this.esEdicion && this.id !== undefined) {
        await firstValueFrom(this.dentistasService.actualizar(this.id, dentista));
      } else {
        await firstValueFrom(this.dentistasService.crear(dentista));
      }

      const alerta = await this.alertController.create({
        header: this.esEdicion ? 'Dentista actualizado' : 'Dentista guardado',
        message: this.esEdicion
          ? 'El dentista fue actualizado correctamente.'
          : 'El dentista fue registrado correctamente.',
        buttons: ['Aceptar']
      });

      await alerta.present();
      await alerta.onDidDismiss();

      await this.modalController.dismiss({ guardado: true });
    } catch (error: any) {
      console.error(
        this.esEdicion
          ? 'Error al actualizar el dentista:'
          : 'Error al guardar el dentista:',
        error
      );

      const alerta = await this.alertController.create({
        header: 'Error',
        message: this.esEdicion
          ? 'No fue posible actualizar el dentista. Revisa los datos, la conexión y los permisos de actualización en Directus.'
          : 'No fue posible guardar el dentista. Revisa los datos, la conexión y los permisos de creación en Directus.',
        buttons: ['Aceptar']
      });

      await alerta.present();
    } finally {
      this.guardando = false;
    }
  }
}
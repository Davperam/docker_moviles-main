import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  enlaces: { ruta: string; texto: string }[] = [
    { ruta: '/alergia-list', texto: 'Alergias' },
    { ruta: '/citas-list', texto: 'Citas' },
    { ruta: '/dentistas-list', texto: 'Dentistas' },
    { ruta: '/citadetalles-list', texto: 'Detalles de Citas' },
    { ruta: '/documentosclinicos-list', texto: 'Documentos clínicos' },
    { ruta: '/especialidad-list', texto: 'Especialidades Consultorio' },
    { ruta: '/dentistaespecialidad-list', texto: 'Especialidades Dentistas' },
    { ruta: '/expedientealergia-list', texto: 'Expedientes alergias' },
    { ruta: '/expedienteclinico-list', texto: 'Expedientes clínicos' },
    { ruta: '/expedientemedicamento-list', texto: 'Expedientes medicamentos' },
    { ruta: '/medicamentos-list', texto: 'Medicamentos'},
    { ruta: '/metodopago-list', texto: 'Métodos de Pagos'},
    { ruta: '/notaclinica-list', texto: 'Notas clínicas' },
    { ruta: '/odontogramas-list', texto: 'Odontogramas' },
    { ruta: '/pacientes-list', texto: 'Pacientes' },
    { ruta: '/servicios-list', texto: 'Servicios del Consultorio' },
    { ruta: '/pagos-list', texto: 'Pagos' },
    { ruta: '/tabs/tab1', texto: 'Tab 1' },
    { ruta: '/tabs/tab2', texto: 'Tab 2' },
    { ruta: '/tabs/tab3', texto: 'Tab 3' },
    
  ];
  constructor() {}
}

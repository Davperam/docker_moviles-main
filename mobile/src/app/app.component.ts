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
    { ruta: '/dentistas-list', texto: 'Dentistas' },
    { ruta: '/citas-list', texto: 'Citas' },
    { ruta: '/citadetalles-list', texto: 'Detalles de Citas' },
    { ruta: '/dentistaespecialidad-list', texto: 'Especialidades Dentistas' },
    { ruta: '/documentosclinicos-list', texto: 'Documentos clínicos' },
    { ruta: '/especialidad-list', texto: 'Especialidades Dentistas' },
    { ruta: '/tabs/tab1', texto: 'Tab 1' },
    { ruta: '/tabs/tab2', texto: 'Tab 2' },
    { ruta: '/tabs/tab3', texto: 'Tab 3' }
  ];
  constructor() {}
}

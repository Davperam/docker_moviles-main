import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'alergia-list',
    loadChildren: () => import('./alergia-list/alergia-list.module').then( m => m.AlergiaListPageModule)
  },
  {
    path: 'alergia-view/:id',
    loadChildren: () => import('./alergia-view/alergia-view.module').then( m => m.AlergiaViewPageModule)
  },
  {
    path: 'alergia-form',
    loadChildren: () => import('./alergia-form/alergia-form.module').then( m => m.AlergiaFormPageModule)
  },
  {
    path: 'citas-list',
    loadChildren: () => import('./citas-list/citas-list.module').then( m => m.CitasListPageModule)
  },
  {
    path: 'citas-veiw/:id',
    loadChildren: () => import('./citas-veiw/citas-veiw.module').then( m => m.CitasVeiwPageModule)
  },
  {
    path: 'citadetalles-list',
    loadChildren: () => import('./citadetalles-list/citadetalles-list.module').then( m => m.CitadetallesListPageModule)
  },
  {
    path: 'citadetalles-view/:id',
    loadChildren: () => import('./citadetalles-view/citadetalles-view.module').then( m => m.CitadetallesViewPageModule)
  },
  {
    path: 'citadetalles-form',
    loadChildren: () => import('./citadetalles-form/citadetalles-form.module').then( m => m.CitadetallesFormPageModule)
  },
  {
    path: 'citas-form',
    loadChildren: () => import('./citas-form/citas-form.module').then( m => m.CitasFormPageModule)
  },
  {
    path: 'dentistas-list',
    loadChildren: () => import('./dentistas-list/dentistas-list.module').then( m => m.DentistasListPageModule)
  },
  {
    path: 'dentistas-view/:id',
    loadChildren: () => import('./dentistas-view/dentistas-view.module').then( m => m.DentistasViewPageModule)
  },
  {
    path: 'dentistas-form',
    loadChildren: () => import('./dentistas-form/dentistas-form.module').then( m => m.DentistasFormPageModule)
  },
  {
    path: 'dentistaespecialidad-list',
    loadChildren: () => import('./dentistaespecialidad-list/dentistaespecialidad-list.module').then( m => m.DentistaespecialidadListPageModule)
  },
  {
    path: 'dentistaespecialidad-view',
    loadChildren: () => import('./dentistaespecialidad-view/dentistaespecialidad-view.module').then( m => m.DentistaespecialidadViewPageModule)
  },
  {
    path: 'dentistaespecialidad-form',
    loadChildren: () => import('./dentistaespecialidad-form/dentistaespecialidad-form.module').then( m => m.DentistaespecialidadFormPageModule)
  },
  {
    path: 'documentosclinicos-list',
    loadChildren: () => import('./documentosclinicos-list/documentosclinicos-list.module').then( m => m.DocumentosclinicosListPageModule)
  },
  {
    path: 'documentosclinicos-view/:id',
    loadChildren: () => import('./documentosclinicos-view/documentosclinicos-view.module').then( m => m.DocumentosclinicosViewPageModule)
  },
  {
    path: 'documentosclinicos-form',
    loadChildren: () => import('./documentosclinicos-form/documentosclinicos-form.module').then( m => m.DocumentosclinicosFormPageModule)
  },
  {
    path: 'especialidad-list',
    loadChildren: () => import('./especialidad-list/especialidad-list.module').then( m => m.EspecialidadListPageModule)
  },
  {
    path: 'especialidad-view/:id',
    loadChildren: () => import('./especialidad-view/especialidad-view.module').then( m => m.EspecialidadViewPageModule)
  },
  {
    path: 'estadocita-list',
    loadChildren: () => import('./estadocita-list/estadocita-list.module').then( m => m.EstadocitaListPageModule)
  },
  {
    path: 'estadocita-view/:id',
    loadChildren: () => import('./estadocita-view/estadocita-view.module').then( m => m.EstadocitaViewPageModule)
  },
  {
    path: 'estadocita-form',
    loadChildren: () => import('./estadocita-form/estadocita-form.module').then( m => m.EstadocitaFormPageModule)
  },
  {
    path: 'expedientealergia-list',
    loadChildren: () => import('./expedientealergia-list/expedientealergia-list.module').then( m => m.ExpedientealergiaListPageModule)
  },
  {
    path: 'expedientealergia-view/:id',
    loadChildren: () => import('./expedientealergia-view/expedientealergia-view.module').then( m => m.ExpedientealergiaViewPageModule)
  },
  {
    path: 'expedienteclinico-list',
    loadChildren: () => import('./expedienteclinico-list/expedienteclinico-list.module').then( m => m.ExpedienteclinicoListPageModule)
  },
  {
    path: 'expedienteclinico-view/:id',
    loadChildren: () => import('./expedienteclinico-view/expedienteclinico-view.module').then( m => m.ExpedienteclinicoViewPageModule)
  },
  {
    path: 'expedientemedicamento-list',
    loadChildren: () => import('./expedientemedicamento-list/expedientemedicamento-list.module').then( m => m.ExpedientemedicamentoListPageModule)
  },
  {
    path: 'expedientemedicamento-view/:id',
    loadChildren: () => import('./expedientemedicamento-view/expedientemedicamento-view.module').then( m => m.ExpedientemedicamentoViewPageModule)
  },
  {
    path: 'medicamentos-list',
    loadChildren: () => import('./medicamentos-list/medicamentos-list.module').then( m => m.MedicamentosListPageModule)
  },
  {
    path: 'medicamentos-view/:id',
    loadChildren: () => import('./medicamentos-view/medicamentos-view.module').then( m => m.MedicamentosViewPageModule)
  },
  {
    path: 'metodopago-list',
    loadChildren: () => import('./metodopago-list/metodopago-list.module').then( m => m.MetodopagoListPageModule)
  },
  {
    path: 'metodopago-view/:id',
    loadChildren: () => import('./metodopago-view/metodopago-view.module').then( m => m.MetodopagoViewPageModule)
  },
  {
    path: 'notaclinica-list',
    loadChildren: () => import('./notaclinica-list/notaclinica-list.module').then( m => m.NotaclinicaListPageModule)
  },
  {
    path: 'notaclinica-view/:id',
    loadChildren: () => import('./notaclinica-view/notaclinica-view.module').then( m => m.NotaclinicaViewPageModule)
  },
  {
    path: 'notaclinica-form',
    loadChildren: () => import('./notaclinica-form/notaclinica-form.module').then( m => m.NotaclinicaFormPageModule)
  },
  {
    path: 'odontogramas-list',
    loadChildren: () => import('./odontogramas-list/odontogramas-list.module').then( m => m.OdontogramasListPageModule)
  },
  {
    path: 'odontogramas-view/:id',
    loadChildren: () => import('./odontogramas-view/odontogramas-view.module').then( m => m.OdontogramasViewPageModule)
  },
  {
    path: 'odontogramas-form',
    loadChildren: () => import('./odontogramas-form/odontogramas-form.module').then( m => m.OdontogramasFormPageModule)
  },
  {
    path: 'pacientes-list',
    loadChildren: () => import('./pacientes-list/pacientes-list.module').then( m => m.PacientesListPageModule)
  },
  {
    path: 'pacientes-view/:id',
    loadChildren: () => import('./pacientes-view/pacientes-view.module').then( m => m.PacientesViewPageModule)
  },
  {
    path: 'pacientes-form',
    loadChildren: () => import('./pacientes-form/pacientes-form.module').then( m => m.PacientesFormPageModule)
  },
  {
    path: 'pagos-list',
    loadChildren: () => import('./pagos-list/pagos-list.module').then( m => m.PagosListPageModule)
  },
  {
    path: 'pagos-view/:id',
    loadChildren: () => import('./pagos-view/pagos-view.module').then( m => m.PagosViewPageModule)
  },
  {
    path: 'pagos-form',
    loadChildren: () => import('./pagos-form/pagos-form.module').then( m => m.PagosFormPageModule)
  },
  {
    path: 'servicios-list',
    loadChildren: () => import('./servicios-list/servicios-list.module').then( m => m.ServiciosListPageModule)
  },
  {
    path: 'servicios-view/:id',
    loadChildren: () => import('./servicios-view/servicios-view.module').then( m => m.ServiciosViewPageModule)
  },
  {
    path: 'servicios-form',
    loadChildren: () => import('./servicios-form/servicios-form.module').then( m => m.ServiciosFormPageModule)
  },  {
    path: 'expedienteclinico-form',
    loadChildren: () => import('./expedienteclinico-form/expedienteclinico-form.module').then( m => m.ExpedienteclinicoFormPageModule)
  },
  {
    path: 'medicamentos-form',
    loadChildren: () => import('./medicamentos-form/medicamentos-form.module').then( m => m.MedicamentosFormPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentistaespecialidadViewPage } from './dentistaespecialidad-view.page';

const routes: Routes = [
  {
    path: '',
    component: DentistaespecialidadViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentistaespecialidadViewPageRoutingModule {}

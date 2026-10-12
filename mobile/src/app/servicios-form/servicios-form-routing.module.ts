import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiciosFormPage } from './servicios-form.page';

const routes: Routes = [
  {
    path: '',
    component: ServiciosFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiciosFormPageRoutingModule {}

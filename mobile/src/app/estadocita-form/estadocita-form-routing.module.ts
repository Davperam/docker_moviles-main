import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadocitaFormPage } from './estadocita-form.page';

const routes: Routes = [
  {
    path: '',
    component: EstadocitaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadocitaFormPageRoutingModule {}

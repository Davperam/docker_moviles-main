import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlergiaFormPage } from './alergia-form.page';

const routes: Routes = [
  {
    path: '',
    component: AlergiaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlergiaFormPageRoutingModule {}

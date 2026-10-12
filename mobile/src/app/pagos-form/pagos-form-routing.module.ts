import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagosFormPage } from './pagos-form.page';

const routes: Routes = [
  {
    path: '',
    component: PagosFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagosFormPageRoutingModule {}

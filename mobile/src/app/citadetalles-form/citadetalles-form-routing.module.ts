import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitadetallesFormPage } from './citadetalles-form.page';

const routes: Routes = [
  {
    path: '',
    component: CitadetallesFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitadetallesFormPageRoutingModule {}

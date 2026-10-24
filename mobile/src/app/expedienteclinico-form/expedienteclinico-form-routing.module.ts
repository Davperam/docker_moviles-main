import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpedienteclinicoFormPage } from './expedienteclinico-form.page';

const routes: Routes = [
  {
    path: '',
    component: ExpedienteclinicoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpedienteclinicoFormPageRoutingModule {}

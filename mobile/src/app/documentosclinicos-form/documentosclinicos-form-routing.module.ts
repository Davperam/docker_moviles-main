import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosclinicosFormPage } from './documentosclinicos-form.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentosclinicosFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosclinicosFormPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosclinicosViewPage } from './documentosclinicos-view.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentosclinicosViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosclinicosViewPageRoutingModule {}

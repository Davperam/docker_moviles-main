import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentosclinicosListPage } from './documentosclinicos-list.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentosclinicosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentosclinicosListPageRoutingModule {}

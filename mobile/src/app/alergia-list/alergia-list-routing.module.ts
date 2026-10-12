import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlergiaListPage } from './alergia-list.page';

const routes: Routes = [
  {
    path: '',
    component: AlergiaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlergiaListPageRoutingModule {}

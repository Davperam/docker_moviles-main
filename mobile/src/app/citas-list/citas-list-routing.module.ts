import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasListPage } from './citas-list.page';

const routes: Routes = [
  {
    path: '',
    component: CitasListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasListPageRoutingModule {}

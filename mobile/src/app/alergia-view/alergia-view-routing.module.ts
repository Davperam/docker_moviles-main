import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlergiaViewPage } from './alergia-view.page';

const routes: Routes = [
  {
    path: '',
    component: AlergiaViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlergiaViewPageRoutingModule {}

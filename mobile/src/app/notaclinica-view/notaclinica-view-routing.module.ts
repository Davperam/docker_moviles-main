import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaclinicaViewPage } from './notaclinica-view.page';

const routes: Routes = [
  {
    path: '',
    component: NotaclinicaViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaclinicaViewPageRoutingModule {}

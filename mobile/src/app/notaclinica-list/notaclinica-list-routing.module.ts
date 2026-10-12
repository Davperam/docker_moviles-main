import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaclinicaListPage } from './notaclinica-list.page';

const routes: Routes = [
  {
    path: '',
    component: NotaclinicaListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaclinicaListPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitadetallesListPage } from './citadetalles-list.page';

const routes: Routes = [
  {
    path: '',
    component: CitadetallesListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitadetallesListPageRoutingModule {}

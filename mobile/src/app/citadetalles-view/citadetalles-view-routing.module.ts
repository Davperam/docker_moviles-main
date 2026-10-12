import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitadetallesViewPage } from './citadetalles-view.page';

const routes: Routes = [
  {
    path: '',
    component: CitadetallesViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitadetallesViewPageRoutingModule {}

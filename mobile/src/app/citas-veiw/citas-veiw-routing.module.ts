import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitasVeiwPage } from './citas-veiw.page';

const routes: Routes = [
  {
    path: '',
    component: CitasVeiwPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitasVeiwPageRoutingModule {}

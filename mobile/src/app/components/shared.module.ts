import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Importa aquí todos tus componentes reutilizables
import { TabBarModule } from './tab-bar/tab-bar.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ViewToolbarModule } from './view-toolbar/view-toolbar.module';
import { PaginacionModule } from './paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TabBarModule,
    ToolbarModule,
    ViewToolbarModule,
    PaginacionModule
  ],
  exports: [
    TabBarModule,
    ToolbarModule,
    ViewToolbarModule,
    PaginacionModule
  ]
})
export class SharedModule {}
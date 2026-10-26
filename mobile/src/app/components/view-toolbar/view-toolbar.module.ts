import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ViewToolbarComponent } from './view-toolbar.component';

@NgModule({
    declarations: [
        ViewToolbarComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [
        ViewToolbarComponent
    ]
})
export class ViewToolbarModule {}
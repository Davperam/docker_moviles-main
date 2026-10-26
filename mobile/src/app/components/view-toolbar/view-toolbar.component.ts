import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-view-toolbar',
  templateUrl: './view-toolbar.component.html',
  styleUrls: ['./view-toolbar.component.scss'],
  standalone: false,
})
export class ViewToolbarComponent {

  @Input() nombre: string = '';
  @Input() color: string = 'secondary';
  @Input() defaultHref: string = '/';

}

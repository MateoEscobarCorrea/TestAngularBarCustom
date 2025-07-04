import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActionToolbarComponent } from './shared/action-toolbar/action-toolbar.component';
import { WindowDesktopComponent } from './shared/components/window-desktop/window-desktop.component';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, ActionToolbarComponent, WindowDesktopComponent],
    templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Modernize Angular Admin Tempplate';
}

import { Component } from '@angular/core';
import { NavigationComponent } from './modules/core/components/navigation/navigation.component';
import { ContentComponent } from './modules/core/components/content/content.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent, ContentComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}

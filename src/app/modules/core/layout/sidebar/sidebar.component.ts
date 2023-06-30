import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiFacade } from '../../ui/facade/ui.facade';
import { Observable } from 'rxjs';
import { SidebarItem, SidebarMenu } from '../../models/sidebar.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public get menu$(): Observable<SidebarMenu[]> {
    return this.uiFacade.menu$;
  }

  constructor(private uiFacade: UiFacade) {}
}

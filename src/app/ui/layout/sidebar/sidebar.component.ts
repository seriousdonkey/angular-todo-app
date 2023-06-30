import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiFacade } from '../../../facade/ui.facade';
import { Observable } from 'rxjs';
import { SidebarMenu } from '../../../models/sidebar.model';
import { CategoriesMenuComponent } from '../categories-menu/categories-menu.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, CategoriesMenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public get menu$(): Observable<SidebarMenu[]> {
    return this.uiFacade.menu$;
  }

  constructor(private uiFacade: UiFacade) {}
}

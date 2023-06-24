import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { UiFacade } from '../../ui/facade/ui.facade';

import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content',
  imports: [CommonModule, CardModule, ProgressSpinnerModule, RouterModule],
  standalone: true,
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  isLoading$: Observable<boolean>;

  constructor(uiFacade: UiFacade) {
    this.isLoading$ = uiFacade.isLoading$;
  }
}

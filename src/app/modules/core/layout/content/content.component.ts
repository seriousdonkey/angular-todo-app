import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { UiFacade } from '../../ui/facade/ui.facade';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-content',
  imports: [CommonModule, RouterModule, CardComponent],
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

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  private _type = 'button';

  @Input()
  public set type(type: 'submit' | 'button') {
    this._type = type;
  }

  public get type(): string {
    return this._type;
  }

  @Input() disabled?: boolean;
}

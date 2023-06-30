import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input({ required: true }) label!: string;
  @Input() inputType?: 'text' | 'email' | 'password' = 'text';

  private _inputText = '';
  private _disabled = false;

  public get inputText(): string {
    return this._inputText;
  }

  public set inputText(val: string) {
    this._inputText = val;
  }

  public get disabled(): boolean {
    return this._disabled;
  }

  public set disabled(val: boolean) {
    this._disabled = val;
  }

  public writeValue(obj: string): void {
    this.inputText = obj;
  }

  public registerOnChange(fn: (val: string) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(): void {
    // empty
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public onInputChanged() {
    this.onChange(this._inputText);
  }

  private onChange = (val: string) => {
    this._inputText = val;
  };
}

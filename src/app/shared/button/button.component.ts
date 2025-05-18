import { Component, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() showAsIcon = false;
}

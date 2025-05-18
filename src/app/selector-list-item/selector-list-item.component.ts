import { Component, Input } from '@angular/core';
import { SelectorListItem } from '../shared/models/selector-list-item.model';
import { SelectorService } from '../shared/services/selector.service';

@Component({
  selector: 'selector-list-item',
  imports: [],
  templateUrl: './selector-list-item.component.html',
  styleUrl: './selector-list-item.component.scss'
})
export class SelectorListItemComponent {
  @Input() listItem!: SelectorListItem;

  constructor(private selectorService: SelectorService) {}

  selectItem(event: MouseEvent): void {
    event.stopPropagation();
    this.selectorService.updateCheckoxStateItem(this.listItem);
  }
}

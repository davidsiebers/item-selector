import { Component } from '@angular/core';
import { ItemSelectorComponent } from "../item-selector/item-selector.component";
import { SelectorService } from '../shared/services/selector.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'filters',
  imports: [AsyncPipe, ItemSelectorComponent, ButtonComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  protected selectedItemIDs$: Observable<number[]>;

  constructor(private readonly selectorService: SelectorService) {
    this.selectedItemIDs$ = this.selectorService.selectedItemIDs$;
  }

  clearSelection() {
    this.selectorService.clearSelection();
  }
}

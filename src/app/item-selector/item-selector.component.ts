import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SelectorService } from '../shared/services/selector.service';
import { SelectorListFolderComponent } from '../selector-list-folder/selector-list-folder.component';
import { SelectorListFolder } from '../shared/models/selector-list-folder.model';

@Component({
  selector: 'item-selector',
  imports: [AsyncPipe, SelectorListFolderComponent],
  templateUrl: './item-selector.component.html',
  styleUrl: './item-selector.component.scss'
})
export class ItemSelectorComponent {
  protected selectorFoldersTree$!: Observable<SelectorListFolder[]>;

  constructor(selectorService: SelectorService) {
    this.selectorFoldersTree$ = selectorService.getSelectorTree();
  }
}

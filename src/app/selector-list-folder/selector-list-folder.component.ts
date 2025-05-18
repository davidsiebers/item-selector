import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectorListFolder } from '../shared/models/selector-list-folder.model';
import { SelectorListItemComponent } from '../selector-list-item/selector-list-item.component';
import { SelectorService } from '../shared/services/selector.service';
import { ButtonComponent } from "../shared/button/button.component";

@Component({
  selector: 'selector-list-folder',
  imports: [SelectorListItemComponent, ButtonComponent],
  templateUrl: './selector-list-folder.component.html',
  styleUrl: './selector-list-folder.component.scss'
})
export class SelectorListFolderComponent {
  protected isOpen = true;
  @Input() listFolder!: SelectorListFolder;
  @Output() checkBoxIsChecked = new EventEmitter<void>();

  constructor(private selectorService: SelectorService) {}

  toggleFolder(event: MouseEvent): void {
    event.stopPropagation();
    const clickedElement = event.target as HTMLElement;
    const rowElement = clickedElement.closest('.selector-list-entry');
    rowElement?.classList.toggle('open');
  }

  selectItem(event: MouseEvent): void {
    event.stopPropagation();
    this.selectorService.updateCheckoxStateFolder(this.listFolder);
  }
}
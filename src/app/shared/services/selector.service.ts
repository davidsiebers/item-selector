import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { SelectorListFolder } from '../models/selector-list-folder.model';
import { SelectorListItem } from '../models/selector-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  private folderMap = new Map<number, SelectorListFolder>();
  private _selectedItemIDs$ = new BehaviorSubject<number[]>([]);
  public selectedItemIDs$ = this._selectedItemIDs$.asObservable();

  constructor(private dateBaseService: DatabaseService) {}

  public getSelectorTree(): Observable<SelectorListFolder[]> {
    return this.dateBaseService.getSelectorList().pipe(map(({ folders, items }) => this.buildFolderTree(folders, items)));
  }

  public updateCheckoxStateFolder(listFolder: SelectorListFolder): void {
    console.log('listFolder', listFolder.id);
    listFolder.checked = !listFolder.checked;
    listFolder.indeterminate = false;

    if (listFolder.parent_id) {
      const parentFolder = this.folderMap.get(listFolder.parent_id);
      if (parentFolder !== undefined) {
        this.updateParentState(parentFolder);
      }
    }

    if (listFolder.children?.length || listFolder.items?.length) {
      this.updateChildrenState(listFolder, listFolder.checked);
    }
  }

  public updateCheckoxStateItem(listItem: SelectorListItem): void {
    console.log('listItem', listItem.id);
    listItem.checked = !listItem.checked;

    this.updateSelectedItemIDs(listItem, listItem.checked);

    if (listItem.folder_id) {
      const parentFolder = this.folderMap.get(listItem.folder_id);

      if (parentFolder !== undefined) {
        this.updateParentState(parentFolder);
      }
    }
  }

  public clearSelection(): void {
    this.folderMap.forEach(item => {
      item.checked = false;
      item.indeterminate = false;
      this.updateChildrenState(item, false);
    })
  }

  private buildFolderTree(folders: SelectorListFolder[], items: SelectorListItem[]): SelectorListFolder[] {
    const roots: SelectorListFolder[] = [];

    folders.forEach(folder => {
      this.folderMap.set(folder.id, folder);
      if (folder.parent_id === null) {
        roots.push(folder);
      } else {
        const parent = this.folderMap.get(folder.parent_id);
        parent?.children?.push(folder);
      }
    });

    items.forEach(item => {
      const folder = this.folderMap.get(item.folder_id);
      if (folder) {
        folder.items?.push(item);
      }
    });

    return roots;
  }

  private updateChildrenState(listFolder: SelectorListFolder, isParentChecked: boolean): void {
    listFolder.children?.forEach(child => {
      child.checked = isParentChecked;
      this.updateChildrenState(child, isParentChecked);
    });

    listFolder.items?.forEach(child => {
      child.checked = isParentChecked;
      this.updateSelectedItemIDs(child, isParentChecked);
    });
  }

  private updateParentState(parentFolder: SelectorListFolder): void {
    if (!parentFolder.children?.length && !parentFolder.items?.length) return;

    const children = [...(parentFolder.children ?? []), ...(parentFolder.items ?? [])];
    const allChecked = children.every(child => child.checked);
    const someChecked = children.some(child => child.checked || ('indeterminate' in child && child.indeterminate));

    parentFolder.checked = allChecked;
    parentFolder.indeterminate = !allChecked && someChecked;

    if (parentFolder.parent_id) {
      const upperParentFolder = this.folderMap.get(parentFolder.parent_id);

      if (upperParentFolder !== undefined) {
        this.updateParentState(upperParentFolder);
      }
    }
  }

  private updateSelectedItemIDs(item: SelectorListItem, isChecked: boolean): void {
    const currentIDs = this._selectedItemIDs$.value;
    let updatedIDs = [...currentIDs];

    if (isChecked && !updatedIDs.includes(item.id)) {
      updatedIDs.push(item.id);
    } else {
      updatedIDs = updatedIDs.filter(id => id !== item.id);
    }

    this._selectedItemIDs$.next(updatedIDs);
  }
}

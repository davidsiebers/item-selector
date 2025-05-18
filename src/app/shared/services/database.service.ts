import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SelectorListFolder } from '../models/selector-list-folder.model';
import { SelectorListItem } from '../models/selector-list-item.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}

  public getSelectorList(): Observable<{ folders: SelectorListFolder[]; items: SelectorListItem[] }> {
  return this.http.get<SelectorListDTO>('assets/response.json').pipe(
    map(data => {
      const folders: SelectorListFolder[] = data.folders.data.map(
        ([id, title, parent_id]) => ({ id, title, parent_id, children: [], items: [] })
      );

      const items: SelectorListItem[] = data.items.data.map(
        ([id, title, folder_id]) => ({ id, title, folder_id })
      );

      return {folders, items};
    })
  );
}
}

interface SelectorListDTO {
  folders: SelectorListFoldersDTO;
  items: SelectorListItemsDTO;
}

interface SelectorListFoldersDTO {
  columns: string[];
  data: [number, string, number | null][];
}

interface SelectorListItemsDTO {
  columns: string[];
  data: [number, string, number][];
}
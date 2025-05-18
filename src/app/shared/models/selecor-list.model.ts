import { SelectorListFolder } from "./selector-list-folder.model";
import { SelectorListItem } from "./selector-list-item.model";

export interface SelectorList {
  folders: SelectorListFolder[];
  items: SelectorListItem[];
}
import { SelectorListItem } from "./selector-list-item.model";

export interface SelectorListFolder {
    id: number;
    title: string;
    parent_id: number | null;
    checked?: boolean;
    indeterminate?: boolean;
    children?: SelectorListFolder[];
    items?: SelectorListItem[];
}
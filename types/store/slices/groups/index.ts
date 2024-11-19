export interface Group {
  color: string;
  id: string;
  name: string;
}
export interface GroupsState {
  favoriteGroups: string[];
  groups: Group[];
}

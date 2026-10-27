export interface CategoryParent {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  index: number;
  child_count: number;
  parent: CategoryParent | null;
  created: string;
}

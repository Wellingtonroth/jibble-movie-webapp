export enum DisplayType {
  GRID = 'grid',
  LIST = 'list'
}

interface DisplayOption {
  value: DisplayType;
  icon: string;
}

export const DISPLAY_OPTIONS: DisplayOption[] = [
  { 
    value: DisplayType.GRID, 
    icon: 'mdi:view-grid'
  },
  { 
    value: DisplayType.LIST, 
    icon: 'mdi:view-list'
  }
] as const; 
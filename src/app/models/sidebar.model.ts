export interface SidebarMenu {
  title: string;
  items: SidebarItem[];
}

export interface SidebarItem {
  title: string;
  route: string;
}

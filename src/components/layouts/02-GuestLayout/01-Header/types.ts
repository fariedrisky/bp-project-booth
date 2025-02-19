export type MenuItem = {
    url: string;
    label: string;
    submenu?: MenuItem[];
  };
  
  export type NavigationProps = {
    menu: MenuItem[];
    isActiveLink: (href: string) => boolean;
  };
  
  export type MobileNavigationProps = NavigationProps & {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
  };
  
  export type MobileMenuToggleProps = {
    isMobileMenuOpen: boolean;
    toggleMobileMenu: () => void;
  };
  
  export type NavLinkProps = {
    item: MenuItem;
    isActive: boolean;
    onClick: () => void;
    toggleSubmenu?: () => void;
    isSubmenuOpen?: boolean;
  };

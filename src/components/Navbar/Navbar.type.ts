export interface NavLinkItem {
  label: string
  to: string
}

export interface NavbarProps {
  onRequestAccess: () => void
}

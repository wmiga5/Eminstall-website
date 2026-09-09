import { LucideIcon } from 'lucide-react';

export interface WorkScopeItemData {
  id: string;
  categoryKey: string;
  mainImage: string | null;
  gallery: string[];
  icon: LucideIcon;
  tags: string[];
}

export interface WorkScopeItemTranslation {
  badge: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  scopeList: string[];
  specifications?: string;
  targetSector?: string;
}

export interface WorkScopeSectionTranslation {
  header: string;
  title: string;
  subtitle: string;
  viewDetails: string;
  closeDetails: string;
  galleryTitle: string;
  galleryCount: string;
  noPhotosNotice: string;
  noPhotosDesc: string;
  scopeListTitle: string;
  specsTitle: string;
  sectorTitle: string;
  contactPrompt: string;
  contactBtn: string;
  prevCard: string;
  nextCard: string;
  prevPhoto: string;
  nextPhoto: string;
  items: Record<string, WorkScopeItemTranslation>;
}

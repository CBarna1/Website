import {
  ShieldCheck,
  Server,
  PhoneCall,
  Network,
  LifeBuoy,
  FileSignature,
  Wrench,
  Code2,
  CloudUpload,
  Building2,
  HardDrive,
  Handshake,
  Hotel,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Server,
  PhoneCall,
  Network,
  LifeBuoy,
  FileSignature,
  Wrench,
  Code2,
  CloudUpload,
  Building2,
  HardDrive,
  Handshake,
  Hotel,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? HelpCircle;
}

export const iconNames = Object.keys(iconMap);

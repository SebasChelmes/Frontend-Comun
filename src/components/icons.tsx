/**
 * Icon set extracted verbatim from the platform design canvas.
 * Each icon inherits `currentColor` and accepts standard SVG props
 * (size via width/height, stroke colour via the `color` style/prop).
 */
import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, strokeWidth = 1.6, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      {...rest}
    >
      {children}
    </svg>
  );
}

export const HomeIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /></>) });

export const ProcessIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M12 3 3 8l9 5 9-5-9-5Z" /><path d="m3 13 9 5 9-5" /></>) });

export const CaptureIcon = (p: IconProps) =>
  base({ ...p, children: (<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" /></>) });

export const AnalysisIcon = (p: IconProps) =>
  base({ ...p, children: <path d="M5 21V11M12 21V5M19 21v-7" /> });

export const AgentsIcon = (p: IconProps) =>
  base({
    ...p,
    children: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
      </>
    ),
  });

export const SettingsIcon = (p: IconProps) =>
  base({
    ...p,
    children: (
      <>
        <path d="M4 7h16M4 17h16" />
        <circle cx="9" cy="7" r="2.4" fill="var(--surface-2)" />
        <circle cx="15" cy="17" r="2.4" fill="var(--surface-2)" />
      </>
    ),
  });

export const PlanIcon = (p: IconProps) =>
  base({ ...p, children: (<><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18" /></>) });

export const LockIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 2, children: (<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>) });

export const StarIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.8, children: <path d="m12 3 2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5L12 3Z" /> });

export const SidebarToggleIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.7, children: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></>) });

export const BellIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.5 21a1.7 1.7 0 0 1-3 0" /></>) });

export const PlusIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.9, children: <path d="M12 5v14M5 12h14" /> });

export const ArrowRightIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.8, children: <path d="M5 12h14M13 6l6 6-6 6" /> });

export const SearchIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.7, children: (<><circle cx="11" cy="11" r="7" /><path d="m20 20-3-3" /></>) });

export const SortIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.7, children: <path d="M4 6h16M7 12h10M10 18h4" /> });

export const LinkIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 2, children: <path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8" /> });

export const EyeIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></>) });

export const MailIcon = (p: IconProps) =>
  base({ ...p, children: (<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>) });

export const EditIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.7, children: (<><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></>) });

export const CloseIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.8, children: <path d="M6 6l12 12M18 6 6 18" /> });

export const CheckIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 2, children: <path d="M20 6 9 17l-5-5" /> });

export const UserIcon = (p: IconProps) =>
  base({ ...p, children: (<><circle cx="12" cy="8" r="3.4" /><path d="M5.5 20a6.5 6.5 0 0 1 13 0" /></>) });

export const ChevronDownIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.8, children: <path d="m6 9 6 6 6-6" /> });

/* sub-opciones del Hub de Agentes IA */
export const PlugIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M8 8V4M16 8V4" /><rect x="6" y="8" width="12" height="5" rx="2" /><path d="M12 13v3a4 4 0 0 0 4 4h1" /></>) });

export const ServerIcon = (p: IconProps) =>
  base({ ...p, children: (<><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></>) });

export const BookIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M5 5a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2Z" /><path d="M8 8h7M8 11.5h7" /></>) });

export const TerminalIcon = (p: IconProps) =>
  base({ ...p, children: (<><rect x="3" y="4" width="18" height="16" rx="2.5" /><path d="m7 9 3 3-3 3M13 15h4" /></>) });

export const BoltIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.7, children: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /> });

export const CpuIcon = (p: IconProps) =>
  base({
    ...p,
    children: (
      <>
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </>
    ),
  });

/* menú de usuario */
export const GlobeIcon = (p: IconProps) =>
  base({ ...p, children: (<><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>) });

export const HelpIcon = (p: IconProps) =>
  base({ ...p, children: (<><circle cx="12" cy="12" r="9" /><path d="M9.6 9.2a2.5 2.5 0 1 1 3.4 2.5c-.7.4-1 .8-1 1.6" /><path d="M12 17h.01" /></>) });

export const InfoIcon = (p: IconProps) =>
  base({ ...p, children: (<><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><path d="M12 8h.01" /></>) });

export const LogoutIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="m10 16-4-4 4-4" /><path d="M6 12h12" /></>) });

export const ShieldIcon = (p: IconProps) =>
  base({ ...p, children: <path d="M12 3 5 6v5c0 4 3 7 7 8 4-1 7-4 7-8V6l-7-3Z" /> });

export const DocIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M6 3h8l4 4v14H6Z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 16.5h6" /></>) });

export const PlayCircleIcon = (p: IconProps) =>
  base({ ...p, children: (<><circle cx="12" cy="12" r="9" /><path d="m10 8.5 5 3.5-5 3.5Z" /></>) });

export const PanelIcon = (p: IconProps) =>
  base({ ...p, children: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M9 9v11" /></>) });

/* menú de acciones de card */
export const MoreIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 2, children: (<><circle cx="12" cy="5" r="1.4" /><circle cx="12" cy="12" r="1.4" /><circle cx="12" cy="19" r="1.4" /></>) });

export const ShareIcon = (p: IconProps) =>
  base({ ...p, children: (<><circle cx="18" cy="5" r="2.6" /><circle cx="6" cy="12" r="2.6" /><circle cx="18" cy="19" r="2.6" /><path d="m8.3 10.7 7.4-4.4M8.3 13.3l7.4 4.4" /></>) });

export const CopyIcon = (p: IconProps) =>
  base({ ...p, children: (<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h8" /></>) });

export const TrashIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M4 7h16" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /><path d="M10 11v6M14 11v6" /></>) });

export const ScaleIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M12 3v18" /><path d="M7 7h10M5 21h14" /><path d="m7 7-3 6a3 3 0 0 0 6 0Z" /><path d="m17 7 3 6a3 3 0 0 1-6 0Z" /></>) });

/* detalle de agente: tabs + chat */
export const ChatIcon = (p: IconProps) =>
  base({ ...p, children: <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-4.1A7.5 7.5 0 1 1 20 11.5Z" /> });

export const FolderIcon = (p: IconProps) =>
  base({ ...p, children: <path d="M4 7a2 2 0 0 1 2-2h3l2 2.2h7A2 2 0 0 1 20 9v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /> });

export const CalendarIcon = (p: IconProps) =>
  base({ ...p, children: (<><rect x="4" y="5" width="16" height="16" rx="2.2" /><path d="M4 9.5h16M8 3v4M16 3v4" /></>) });

export const InboxIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M4 13 6.4 6a2 2 0 0 1 1.9-1.3h7.4A2 2 0 0 1 17.6 6L20 13v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" /><path d="M4 13h4l1.3 2.2h5.4L16 13h4" /></>) });

export const PaperclipIcon = (p: IconProps) =>
  base({ ...p, children: <path d="M20.5 11.5 12 20a5 5 0 0 1-7-7l8.4-8.4a3.4 3.4 0 1 1 4.8 4.8L9.7 14.8a1.7 1.7 0 0 1-2.4-2.4l7.4-7.3" /> });

export const SendIcon = (p: IconProps) =>
  base({ ...p, strokeWidth: 1.8, children: (<><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></>) });

export const UploadIcon = (p: IconProps) =>
  base({ ...p, children: (<><path d="M5 16v2a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2" /><path d="M12 15V3" /><path d="m7 8 5-5 5 5" /></>) });

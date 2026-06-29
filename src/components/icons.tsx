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

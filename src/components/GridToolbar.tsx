import { SearchIcon, SortIcon } from './icons';
import './GridToolbar.css';

export interface ToolbarFilter {
  id: string;
  label: string;
}

interface Props {
  filters: ToolbarFilter[];
  active: string;
  onFilter: (id: string) => void;
  query: string;
  onQuery: (q: string) => void;
  searchPlaceholder?: string;
  onSort?: () => void;
}

/** Barra de herramientas compartida (filtro segmentado + búsqueda + ordenar).
 *  La usan Procesos y el Hub de Agentes para verse idénticas. */
export function GridToolbar({
  filters,
  active,
  onFilter,
  query,
  onQuery,
  searchPlaceholder = 'Buscar…',
  onSort,
}: Props) {
  return (
    <div className="tb-toolbar">
      <div className="tb-seg">
        {filters.map((f) => (
          <button
            type="button"
            key={f.id}
            className={`tb-seg__opt ${active === f.id ? 'is-active' : ''}`}
            onClick={() => onFilter(f.id)}
            aria-pressed={active === f.id}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="tb-search">
        <SearchIcon size={16} style={{ color: 'var(--ink-3)' }} />
        <input
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => onQuery(e.target.value)}
        />
      </div>
      <button type="button" className="tb-sort" onClick={onSort}>
        <SortIcon size={15} />
        Ordenar
      </button>
    </div>
  );
}

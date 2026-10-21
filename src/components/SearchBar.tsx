import { useId } from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number | null;
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  const inputId = useId();

  return (
    <div className="search">
      <label htmlFor={inputId}>Search tasks</label>
      <input
        id={inputId}
        type="search"
        placeholder="Search by title, description or tag"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {resultCount !== null ? (
        <span className="search__count" data-testid="search-result-count">
          {resultCount} result{resultCount === 1 ? '' : 's'}
        </span>
      ) : null}
    </div>
  );
}

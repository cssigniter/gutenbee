import { useState, useEffect } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { useSelect } from 'wp.data';
import { useDebounce } from 'use-debounce';
import { BaseControl, TextControl, Spinner } from 'wp.components';

const propTypes = {
  label: PropTypes.string.isRequired,
  taxonomy: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
};

const TermSelect = ({
  label,
  taxonomy = 'post_tag',
  values = [],
  onChange,
}) => {
  const MIN_QUERY_LENGTH = 2;
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);
  const [queryFocused, setQueryFocused] = useState(false);

  const results = useSelect(
    select => {
      if (debouncedQuery?.length <= MIN_QUERY_LENGTH) {
        return null;
      }

      const { getEntityRecords } = select('core');

      return getEntityRecords('taxonomy', taxonomy, {
        per_page: 15,
        search: debouncedQuery,
      });
    },
    [debouncedQuery],
  );
  const loading = query?.length > MIN_QUERY_LENGTH && results === null;
  const resultsEmpty =
    query?.length > 0 && results != null && results?.length === 0;

  const onValuesChange = optionValue => {
    if (values.includes(optionValue)) {
      onChange(values.filter(v => v !== optionValue));
      return;
    }

    onChange([optionValue, ...values]);
  };

  const entities = useSelect(
    select => {
      if (!values.length) {
        return null;
      }

      const { getEntityRecords } = select('core');

      return getEntityRecords('taxonomy', taxonomy, {
        per_page: -1,
        slug: values,
      });
    },
    [values, taxonomy],
  );

  useEffect(
    () => {
      if (debouncedQuery?.length > MIN_QUERY_LENGTH && !queryFocused) {
        setQueryFocused(true);
      }

      if (debouncedQuery?.length <= MIN_QUERY_LENGTH && queryFocused) {
        setQueryFocused(false);
      }
    },
    [debouncedQuery?.length],
  );

  return (
    <BaseControl label={label}>
      <div className="entity-select-search-control">
        <TextControl
          label={__('Search')}
          hideLabelFromVision
          placeholder={__('Type to search terms…')}
          className="entity-select-search-control-input"
          value={query}
          onChange={setQuery}
          onBlur={() => {
            setTimeout(() => {
              setQueryFocused(false);
            }, 250);
          }}
        />

        <div
          className="entity-select-search-control-results"
          style={{
            display: queryFocused ? 'block' : 'none',
          }}
        >
          {loading && (
            <div className="entity-select-search-control-results-loading">
              <Spinner /> {__('Loading...')}
            </div>
          )}

          {resultsEmpty && <p>{__('No results found.')}</p>}

          {results?.length > 0 &&
            results.map(result => {
              return (
                <a
                  key={result.id}
                  className="entity-select-search-control-results-item"
                  href="#"
                  onClick={event => {
                    event.preventDefault();
                    onValuesChange(result.slug);
                    setQuery('');
                  }}
                >
                  {result.name ?? __('(No Title)')}
                </a>
              );
            })}
        </div>
      </div>

      {entities?.length > 0 && (
        <div className="entity-search-values entity-search-values-inline">
          {entities.map(entity => {
            return (
              <span key={entity.id} className="entity-search-values-item">
                <span className="entity-search-values-item-title">
                  {entity.name}
                </span>
                <button
                  className="components-button"
                  onClick={() => onValuesChange(entity.slug)}
                >
                  &times;
                </button>
              </span>
            );
          })}
        </div>
      )}
    </BaseControl>
  );
};

TermSelect.propTypes = propTypes;

export default TermSelect;

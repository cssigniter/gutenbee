import { useState } from 'wp.element';
import PropTypes from 'prop-types';
import { __ } from 'wp.i18n';
import { useSelect } from 'wp.data';
import { useDebounce } from 'use-debounce';
import { BaseControl, TextControl, Spinner } from 'wp.components';

const propTypes = {
  label: PropTypes.string.isRequired,
  postType: PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
    }),
  ),
  onChange: PropTypes.func.isRequired,
};

const EntitySelect = ({ label, postType = 'post', values = [], onChange }) => {
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

      return getEntityRecords('postType', postType, {
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
      onChange(values.filter(v => v.id !== optionValue.id));
      return;
    }

    onChange([optionValue, ...values]);
  };

  return (
    <BaseControl label={label}>
      <div className="entity-select-search-control">
        <TextControl
          label={__('Search')}
          hideLabelFromVision
          placeholder={__('Search posts…')}
          className="entity-select-search-control-input"
          value={query}
          onChange={setQuery}
          onFocus={() => {
            setQueryFocused(true);
          }}
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
          {!loading && !resultsEmpty && query?.length <= MIN_QUERY_LENGTH && (
            <p>{__('Type to search...')}</p>
          )}

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
                    onValuesChange({
                      id: result.id,
                      title: result.title.raw,
                    });
                    setQuery('');
                  }}
                >
                  {result.title.raw}
                </a>
              );
            })}
        </div>
      </div>

      {values.length > 0 && (
        <div className="entity-search-values">
          {values.map(v => {
            return (
              <span key={v.id} className="entity-search-values-item">
                <span className="entity-search-values-item-title">
                  {v.title ?? `Post ID: ${v.id}`}
                </span>
                <button
                  className="components-button"
                  onClick={() => onValuesChange(v)}
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

EntitySelect.propTypes = propTypes;

export default EntitySelect;

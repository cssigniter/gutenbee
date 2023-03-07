import { Fragment, useRef } from 'wp.element';
import { __ } from 'wp.i18n';
import { SelectControl, PanelBody } from 'wp.components';
import { useBlockProps, RichText, InspectorControls } from 'wp.blockEditor';
import { createBlock } from 'wp.blocks';
import { useSelect } from 'wp.data';
import { useEffect } from 'wp.element';

import EntitySelect from '../../../components/controls/entity-select/EntitySelect';
import isRenderedInEditor from '../../../util/isRenderedInEditor';

export default function Edit({
  attributes,
  setAttributes,
  onReplace,
  isSelected,
  clientId,
}) {
  const {
    tabIndex,
    buttonBgColor,
    buttonBorderColor,
    activeButtonTextColor,
    activeButtonBgColor,
    activeButtonBorderColor,
  } = attributes;

  const { categories } = useSelect(select => {
    return {
      categories: select('core').getEntityRecords('taxonomy', 'product_cat', {
        per_page: -1,
      }),
    };
  });

  const unescapeEntities = text => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText || '';
  };

  const options = categories
    ? categories.map(category => {
        return { label: unescapeEntities(category.name), value: category.id };
      })
    : [];

  options.unshift({ label: __('Select a category'), value: '' });

  const ref = useRef(null);

  const blockProps = useBlockProps({
    className: 'wp-block-gutenbee-product-tab',
  });

  const { content, termId, selectedProducts } = attributes;

  const { index } = useSelect(select => {
    const { getBlockIndex } = select('core/block-editor');
    return {
      index: getBlockIndex(clientId),
    };
  });

  useEffect(
    () => {
      if (index) {
        setAttributes({ tabIndex: index });
      }
    },
    [index],
  );

  const onTermSelect = value => {
    let obj = options.find(o => o.value === parseInt(value, 10));
    wp.data.dispatch('core/block-editor').updateBlockAttributes(clientId, {
      content: obj.label,
    });
  };

  const parentClientId = useSelect(
    select =>
      select('core/block-editor').getBlockHierarchyRootClientId(clientId),
    [],
  );

  const parentAttributes = useSelect(
    select => select('core/block-editor').getBlockAttributes(parentClientId),
    [parentClientId],
  );

  return (
    <Fragment>
      {isSelected && isRenderedInEditor(ref.current) && (
        <InspectorControls>
          <PanelBody>
            {options && (
              <SelectControl
                label={__('Product Category')}
                value={termId}
                options={options}
                onChange={value => {
                  setAttributes({
                    termId: value !== '' ? value : '',
                  });
                  onTermSelect(value);
                }}
              />
            )}
            <EntitySelect
              postType="product"
              label={__('Included Products')}
              values={selectedProducts}
              onChange={value => setAttributes({ selectedProducts: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
      <li
        {...blockProps}
        ref={ref}
        style={{
          color:
            tabIndex === parentAttributes.activeTabIndex
              ? activeButtonTextColor
              : undefined,
          backgroundColor:
            tabIndex === parentAttributes.activeTabIndex
              ? activeButtonBgColor
              : buttonBgColor || undefined,
          borderColor:
            tabIndex === parentAttributes.activeTabIndex
              ? activeButtonBorderColor
              : buttonBorderColor || undefined,
        }}
      >
        <RichText
          identifier="content"
          tagName="span"
          value={content}
          aria-label={__('Product Tab block')}
          placeholder={__('Tab title…')}
          // keepPlaceholderOnFocus={true}
          multiline={false}
          disableLineBreaks={true}
          onChange={value => {
            setAttributes({
              content: value !== '' ? value : '',
            });
          }}
          onReplace={onReplace}
          onSplit={value => {
            if (!value) {
              return createBlock('gutenbee/product-tab');
            }

            return createBlock('gutenbee/product-tab', {
              ...attributes,
              content: value,
            });
          }}
        />
      </li>
    </Fragment>
  );
}

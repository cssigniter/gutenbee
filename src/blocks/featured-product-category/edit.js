import ServerSideRender from 'wp.serverSideRender';
import { useSelect } from 'wp.data';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  RangeControl,
  PanelBody,
  CheckboxControl,
  SelectControl,
} from 'wp.components';
import { InspectorControls } from 'wp.blockEditor';

import 'slick-carousel';
import useUniqueId from '../../hooks/useUniqueId';
import EntitySelect from '../../components/controls/entity-select/EntitySelect';

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    categoryId,
    handpickedProducts,
    showCat,
    showRating,
    showPrice,
    showStock,
    showButton,
    numberColumns,
    numberProducts,
    layout,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

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

  return (
    <Fragment>
      <ServerSideRender
        block="gutenbee/featured-product-category"
        attributes={attributes}
      />
      <InspectorControls>
        <PanelBody>
          {options && (
            <SelectControl
              label={__('Product Category')}
              value={categoryId}
              options={options}
              onChange={value => {
                setAttributes({
                  categoryId: value !== '' ? value : '',
                });
              }}
            />
          )}
          <EntitySelect
            postType="product"
            label={__('Included Products')}
            values={handpickedProducts}
            onChange={value => setAttributes({ handpickedProducts: value })}
          />
        </PanelBody>
        <PanelBody>
          <RangeControl
            __nextHasNoMarginBottom
            currentInput={3}
            value={numberColumns}
            initialPosition={3}
            label={__('Columns')}
            max={4}
            min={1}
            onChange={value =>
              setAttributes({
                numberColumns: value !== '' ? value : '',
              })
            }
            resetFallbackValue={3}
            separatorType="none"
            shiftStep={1}
          />
          <RangeControl
            __nextHasNoMarginBottom
            currentInput={3}
            value={numberProducts}
            initialPosition={3}
            label={__('Number of products')}
            max={12}
            min={1}
            onChange={value =>
              setAttributes({
                numberProducts: value !== '' ? value : '',
              })
            }
            resetFallbackValue={3}
            separatorType="none"
            shiftStep={1}
          />
          <SelectControl
            __next36pxDefaultSize
            __nextHasNoMarginBottom
            label={__('Layout')}
            value={layout}
            onChange={value =>
              setAttributes({
                layout: value,
              })
            }
            help={__(
              'Please note that the slider is not interactive inside the editor, only on the front end. Also make sure that all product categories have at least as many items as the number of columns you have selected for the slider to work properly.',
            )}
            options={[
              {
                label: __('Grid'),
                value: 'grid',
              },
              {
                label: __('Slider'),
                value: 'slider',
              },
            ]}
          />
          <CheckboxControl
            checked={showCat}
            label={__('Show category')}
            onChange={value =>
              setAttributes({
                showCat: value,
              })
            }
          />
          <CheckboxControl
            checked={showPrice}
            label={__('Show price')}
            onChange={value =>
              setAttributes({
                showPrice: value,
              })
            }
          />
          <CheckboxControl
            checked={showStock}
            label={__('Show stock')}
            onChange={value =>
              setAttributes({
                showStock: value,
              })
            }
          />
          <CheckboxControl
            checked={showRating}
            label={__('Show rating')}
            onChange={value =>
              setAttributes({
                showRating: value,
              })
            }
          />
          <CheckboxControl
            checked={showButton}
            label={__('Show add to cart button')}
            onChange={value =>
              setAttributes({
                showButton: value,
              })
            }
          />
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
}

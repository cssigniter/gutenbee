import ServerSideRender from 'wp.serverSideRender';
import { useSelect } from 'wp.data';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  RangeControl,
  PanelBody,
  CheckboxControl,
  SelectControl,
  TextControl,
  TextareaControl,
  Button,
  __experimentalText as Text,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from 'wp.components';
import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from 'wp.blockEditor';

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
    showCategory,
    categoryImage,
    categoryTitle,
    categoryDescription,
    buttonText,
    contentPosition,
    textColor,
    gradient,
    gradientOpacity,
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

  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  return (
    <Fragment>
      <ServerSideRender
        block="gutenbee/featured-product-category"
        attributes={attributes}
      />
      <InspectorControls>
        <PanelBody title={__('Content options')} initialOpen={true}>
          {options && (
            <SelectControl
              label={__('Product Category')}
              value={categoryId}
              options={options}
              onChange={value => {
                setAttributes({
                  categoryId: value,
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
        <PanelBody title={__('Layout options')} initialOpen={false}>
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
          <CheckboxControl
            checked={showCategory}
            label={__('Show category card')}
            onChange={value =>
              setAttributes({
                showCategory: value,
              })
            }
          />
        </PanelBody>
        <PanelBody title={__('Category card options')} initialOpen={false}>
          <Text className="featured-product-category-background-image-heading">
            {__('Custom image')}
          </Text>
          <MediaUploadCheck>
            {!categoryImage ? (
              <MediaUpload
                onSelect={image => {
                  setAttributes({ categoryImage: image });
                }}
                allowedTypes={['image']}
                render={({ open }) => {
                  return (
                    <div className="gutenbee-control-background-image-actions featured-product-category-background-image-actions">
                      <Button isSecondary onClick={open}>
                        {__('Choose image')}
                      </Button>
                    </div>
                  );
                }}
              />
            ) : (
              <Fragment>
                <MediaUpload
                  onSelect={image => {
                    setAttributes({ categoryImage: image });
                  }}
                  allowedTypes={['image']}
                  render={({ open }) => {
                    return (
                      <div className="gutenbee-control-background-image-actions-wrapper featured-product-category-background-image-actions-wrapper">
                        <a
                          href="#"
                          className="gutenbee-control-background-image-placeholder"
                          onClick={open}
                        >
                          <img src={categoryImage.url} alt="" />
                        </a>

                        <div className="gutenbee-control-background-image-actions">
                          <Button isSecondary onClick={open}>
                            {__('Change')}
                          </Button>

                          <Button
                            isDestructive
                            onClick={() => {
                              setAttributes({ categoryImage: '' });
                            }}
                          >
                            {__('Remove')}
                          </Button>
                        </div>
                      </div>
                    );
                  }}
                />
              </Fragment>
            )}
          </MediaUploadCheck>
          <TextControl
            label={__('Category card title')}
            value={categoryTitle}
            onChange={value => setAttributes({ categoryTitle: value })}
          />
          <TextareaControl
            label={__('Category description')}
            value={categoryDescription}
            onChange={value => setAttributes({ categoryDescription: value })}
          />
          <TextControl
            label={__('Button text')}
            value={buttonText}
            onChange={value => setAttributes({ buttonText: value })}
          />
          <SelectControl
            value={contentPosition}
            __next36pxDefaultSize
            __nextHasNoMarginBottom
            label={__('Content position')}
            labelPosition="top"
            onChange={value =>
              setAttributes({
                contentPosition: value,
              })
            }
            options={[
              {
                disabled: true,
                label: __('Select an option'),
                value: '',
              },
              {
                label: __('Top left'),
                value: 'top-left',
              },
              {
                label: __('Top center'),
                value: 'top-center',
              },
              {
                label: __('Top right'),
                value: 'top-right',
              },
              {
                label: __('Middle left'),
                value: 'middle-left',
              },
              {
                label: __('Middle center'),
                value: 'middle-center',
              },
              {
                label: __('Middle right'),
                value: 'middle-right',
              },
              {
                label: __('Bottom left'),
                value: 'bottom-left',
              },
              {
                label: __('Bottom center'),
                value: 'bottom-center',
              },
              {
                label: __('Bottom right'),
                value: 'bottom-right',
              },
            ]}
          />
        </PanelBody>
      </InspectorControls>
      <InspectorControls group="color">
        <ColorGradientSettingsDropdown
          __experimentalIsRenderedInSidebar
          settings={[
            {
              colorValue: textColor,
              label: __('Text'),
              onColorChange: value =>
                setAttributes({
                  textColor: value,
                }),
              resetAllFilter: () => {
                setAttributes({
                  textColor: undefined,
                });
              },
            },
          ]}
          panelId={clientId}
          {...colorGradientSettings}
          gradients={[]}
          disableCustomGradients={true}
        />
        <ColorGradientSettingsDropdown
          __experimentalIsRenderedInSidebar
          settings={[
            {
              gradientValue: gradient,
              label: __('Overlay'),
              onGradientChange: value =>
                setAttributes({
                  gradient: value,
                }),
              isShownByDefault: true,
              resetAllFilter: () => ({
                gradient: undefined,
                customGradient: undefined,
              }),
            },
          ]}
          disableCustomColors={true}
          panelId={clientId}
          {...colorGradientSettings}
        />
        <ToolsPanelItem
          hasValue={() => {
            return gradientOpacity === undefined ? false : gradientOpacity;
          }}
          label={__('Gradient opacity')}
          onDeselect={() => setAttributes({ gradientOpacity: 50 })}
          resetAllFilter={() => ({
            gradientOpacity: 50,
          })}
          isShownByDefault
          panelId={clientId}
        >
          <RangeControl
            __nextHasNoMarginBottom
            label={__('Gradient opacity')}
            value={gradientOpacity}
            onChange={value =>
              setAttributes({
                gradientOpacity: value,
              })
            }
            min={0}
            max={1}
            step={0.1}
            required
          />
        </ToolsPanelItem>
      </InspectorControls>
    </Fragment>
  );
}

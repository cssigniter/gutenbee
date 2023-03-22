import ServerSideRender from 'wp.serverSideRender';
import { useSelect } from 'wp.data';
import { Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  RangeControl,
  PanelBody,
  CheckboxControl,
  SelectControl,
  Button,
  TextControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  Tip,
} from 'wp.components';
import {
  InspectorControls,
  MediaUploadCheck,
  MediaUpload,
  URLInput,
} from 'wp.blockEditor';

import useUniqueId from '../../hooks/useUniqueId';

export default function Edit({ attributes, setAttributes, clientId }) {
  const { layout, numberColumns } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const {
    showTitle,
    items,
    showCount,
    buttonAlignment,
    buttonText,
    buttonLink,
    buttonNewTab,
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

  const addNewRow = () => {
    setAttributes({ items: [...items, { productCat: '', customImage: '' }] });
  };

  const onSelectCategory = (index, value) => {
    const newItems = items.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          productCat: value,
        };
      }

      return item;
    });

    setAttributes({ items: newItems });
  };

  const onSelectImage = (index, value) => {
    const newItems = items.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          customImage: value,
        };
      }

      return item;
    });

    setAttributes({ items: newItems });
  };

  const onRemoveImage = index => {
    const newItems = items.map((item, itemIndex) => {
      if (itemIndex === index) {
        return {
          ...item,
          customImage: '',
        };
      }

      return item;
    });

    setAttributes({ items: newItems });
  };

  const removeRow = index => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setAttributes({ items: newItems });
  };

  const onChangeButtonAlignment = newButtonAlignment => {
    setAttributes({
      buttonAlignment:
        newButtonAlignment === undefined ? 'left' : newButtonAlignment,
    });
  };

  return (
    <Fragment>
      <ServerSideRender
        block="gutenbee/product-category-list"
        attributes={attributes}
      />
      <InspectorControls>
        <PanelBody title={__('Layout settings')} initialOpen={true}>
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
            checked={showTitle}
            label={__('Show category title')}
            onChange={value =>
              setAttributes({
                showTitle: value,
              })
            }
          />
          <CheckboxControl
            checked={showCount}
            label={__('Show category count')}
            onChange={value =>
              setAttributes({
                showCount: value,
              })
            }
          />
        </PanelBody>
        <PanelBody title={__('Button settings')} initialOpen={false}>
          <TextControl
            __nextHasNoMarginBottom
            label={__('Text')}
            onChange={value =>
              setAttributes({
                buttonText: value,
              })
            }
            type="text"
            value={buttonText}
          />
          <URLInput
            label={__('Link')}
            value={buttonLink}
            className="gutenbee-product-category-list-url-input"
            placeholder={__('Set button link')}
            disableSuggestions={true}
            onChange={value =>
              setAttributes({
                buttonLink: value,
              })
            }
          />
          <Tip>{__('Leave this empty to hide the button.')}</Tip>
          <CheckboxControl
            checked={buttonNewTab}
            label={__('Open in new tab')}
            onChange={value =>
              setAttributes({
                buttonNewTab: value,
              })
            }
          />
          <ToggleGroupControl
            __nextHasNoMarginBottom
            isBlock
            label={__('Alignment')}
            value={buttonAlignment}
            onChange={value => {
              onChangeButtonAlignment(value);
            }}
          >
            <ToggleGroupControlOption label={__('Left')} value="left" />
            <ToggleGroupControlOption label={__('Center')} value="center" />
            <ToggleGroupControlOption label={__('Right')} value="right" />
          </ToggleGroupControl>
        </PanelBody>
        <PanelBody
          title={__('Category selection')}
          className="gutenbee-product-category-list-repeater-wrap"
          initialOpen={false}
        >
          {items.map((item, index) => {
            return (
              <div
                key={index}
                className="gutenbee-product-category-list-repeater-item"
              >
                {options && (
                  <SelectControl
                    label={`Category ${index + 1}`}
                    value={item.productCat}
                    options={options}
                    onChange={newValue => {
                      onSelectCategory(index, newValue);
                    }}
                  />
                )}
                <MediaUploadCheck>
                  {!item.customImage ? (
                    <MediaUpload
                      onSelect={image => {
                        onSelectImage(index, image);
                      }}
                      allowedTypes={['image']}
                      render={({ open }) => {
                        return (
                          <div className="gutenbee-control-background-image-actions">
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
                          onSelectImage(index, image);
                        }}
                        allowedTypes={['image']}
                        render={({ open }) => {
                          return (
                            <Fragment>
                              <a
                                href="#"
                                className="gutenbee-control-background-image-placeholder"
                                onClick={open}
                              >
                                <img src={item.customImage.url} alt="" />
                              </a>

                              <div className="gutenbee-control-background-image-actions">
                                <Button isSecondary onClick={open}>
                                  {__('Change')}
                                </Button>

                                <Button
                                  isDestructive
                                  onClick={() => {
                                    onRemoveImage(index);
                                  }}
                                >
                                  {__('Remove')}
                                </Button>
                              </div>
                            </Fragment>
                          );
                        }}
                      />
                    </Fragment>
                  )}
                </MediaUploadCheck>
                <Button isDestructive onClick={() => removeRow(index)}>
                  {__('Remove category')}
                </Button>
              </div>
            );
          })}
          <Button isPrimary onClick={addNewRow}>
            {__('Add category')}
          </Button>
        </PanelBody>
      </InspectorControls>
    </Fragment>
  );
}

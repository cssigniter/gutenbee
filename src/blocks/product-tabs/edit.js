import { InnerBlocks, useBlockProps } from 'wp.blockEditor';
import ServerSideRender from 'wp.serverSideRender';
import { useSelect } from 'wp.data';
import { useEffect, Fragment } from 'wp.element';
import { __ } from 'wp.i18n';
import {
  RangeControl,
  PanelBody,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  CheckboxControl,
  SelectControl,
} from 'wp.components';
import {
  InspectorControls,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from 'wp.blockEditor';

import 'slick-carousel';
import getBlockId from '../../util/getBlockId';
import useUniqueId from '../../hooks/useUniqueId';

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    tabIndices,
    activeTabIndex,
    tabButtonAlignment,
    showCat,
    showRating,
    showPrice,
    showStock,
    showButton,
    numberColumns,
    numberProducts,
    buttonTextColor,
    buttonBgColor,
    buttonBorderColor,
    activeButtonTextColor,
    activeButtonBgColor,
    activeButtonBorderColor,
    layout,
    uniqueId,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockProps = useBlockProps({
    id: getBlockId(uniqueId),
    className: `wp-block-gutenbee-product-tabs wp-block-gutenbee-product-tabs-${tabButtonAlignment} wp-block-gutenbee-product-tabs-${layout}`,
  });

  const innerBlocks = useSelect(
    select => {
      return select('core/block-editor').getBlocks(clientId);
    },
    [clientId],
  );

  useEffect(
    () => {
      const termIds = innerBlocks.map(
        ({ clientId, attributes: { termId } }) => ({ clientId, termId }),
      );

      const tabIndices = innerBlocks.map(
        ({ clientId, attributes: { tabIndex } }) => ({ clientId, tabIndex }),
      );

      const handpickedProducts = innerBlocks.map(
        ({ attributes: { selectedProducts, tabIndex } }) => ({
          tabIndex,
          selectedProducts,
        }),
      );
      setAttributes({
        categoryIds: termIds,
        tabIndices: tabIndices,
        handpickedProducts: handpickedProducts,
      });
    },
    [innerBlocks],
  );

  const { tabClientId } = useSelect(select => {
    const { getSelectedBlockClientIds, getBlockName } = select(
      'core/block-editor',
    );
    let selectedClientIds = getSelectedBlockClientIds();
    if (0 !== selectedClientIds.length) {
      let blockName = getBlockName(selectedClientIds[0]);

      if (blockName === 'gutenbee/product-tab') {
        return { tabClientId: selectedClientIds };
      }
    }

    return {
      tabClientId,
    };
  });

  const getTabIndexByClientId = tabClientId => {
    if (tabClientId.length !== 0) {
      let obj = tabIndices.find(o => o.clientId === tabClientId[0]);
      if (undefined !== obj) {
        return obj.tabIndex;
      }
    }
    return activeTabIndex;
  };

  useEffect(
    () => {
      if (tabClientId) {
        setAttributes({ activeTabIndex: getTabIndexByClientId(tabClientId) });
      }
    },
    [tabClientId],
  );

  const onChangeTabButtonAlignment = newTabButtonAlignment => {
    setAttributes({
      tabButtonAlignment:
        newTabButtonAlignment === undefined ? 'left' : newTabButtonAlignment,
    });
  };

  const colorGradientSettings = useMultipleOriginColorsAndGradients();

  const onButtonColorChange = (value, attributeLabel) => {
    innerBlocks.forEach(block => {
      wp.data
        .dispatch('core/block-editor')
        .updateBlockAttributes(block.clientId, { [attributeLabel]: value });
    });
  };

  useEffect(
    () => {
      innerBlocks.forEach(block => {
        if (
          !block.attributes.buttonBgColor &&
          !block.attributes.buttonBorderColor &&
          !block.attributes.activeButtonTextColor &&
          !block.attributes.activeButtonBorderColor &&
          !block.attributes.activeButtonBgColor
        ) {
          wp.data
            .dispatch('core/block-editor')
            .updateBlockAttributes(block.clientId, {
              buttonBgColor: buttonBgColor,
              buttonBorderColor: buttonBorderColor,
              activeButtonTextColor: activeButtonTextColor,
              activeButtonBorderColor: activeButtonBorderColor,
              activeButtonBgColor: activeButtonBgColor,
            });
        }
      });
    },
    [innerBlocks],
  );

  return (
    <Fragment>
      <div {...blockProps}>
        <ul
          className="wp-block-gutenbee-product-tabs-nav"
          style={{
            color: buttonTextColor || undefined,
          }}
        >
          <InnerBlocks
            allowedBlocks={['gutenbee/product-tab']}
            template={[['gutenbee/product-tab']]}
          />
        </ul>
        <ServerSideRender
          block="gutenbee/product-tabs"
          attributes={attributes}
        />
      </div>
      <InspectorControls>
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
          <ToggleGroupControl
            __nextHasNoMarginBottom
            isBlock
            label={__('Tab button alignment')}
            value={tabButtonAlignment}
            onChange={value => {
              onChangeTabButtonAlignment(value);
            }}
          >
            <ToggleGroupControlOption label={__('Left')} value="left" />
            <ToggleGroupControlOption label={__('Center')} value="center" />
            <ToggleGroupControlOption label={__('Right')} value="right" />
          </ToggleGroupControl>
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
      <InspectorControls group="color">
        <ColorGradientSettingsDropdown
          __experimentalIsRenderedInSidebar
          settings={[
            {
              colorValue: buttonTextColor,
              label: __('Tab button text'),
              onColorChange: value =>
                setAttributes({
                  buttonTextColor: value,
                }),
              resetAllFilter: () => {
                setAttributes({
                  buttonTextColor: undefined,
                  buttonBgColor: undefined,
                  buttonBorderColor: undefined,
                  activeButtonTextColor: undefined,
                  activeButtonBgColor: undefined,
                  activeButtonBorderColor: undefined,
                });
                onButtonColorChange(undefined, 'buttonBgColor');
                onButtonColorChange(undefined, 'buttonBorderColor');
              },
            },
            {
              colorValue: buttonBgColor,
              label: __('Tab button background'),
              onColorChange: value => {
                setAttributes({
                  buttonBgColor: value,
                });
                onButtonColorChange(value, 'buttonBgColor');
              },
            },
            {
              colorValue: buttonBorderColor,
              label: __('Tab button border'),
              onColorChange: value => {
                setAttributes({
                  buttonBorderColor: value,
                });
                onButtonColorChange(value, 'buttonBorderColor');
              },
            },
            {
              colorValue: activeButtonTextColor,
              label: __('Active tab button text'),
              onColorChange: value => {
                setAttributes({
                  activeButtonTextColor: value,
                }),
                  onButtonColorChange(value, 'activeButtonTextColor');
              },
            },
            {
              colorValue: activeButtonBgColor,
              label: __('Active tab button background'),
              onColorChange: value => {
                setAttributes({
                  activeButtonBgColor: value,
                });
                onButtonColorChange(value, 'activeButtonBgColor');
              },
            },
            {
              colorValue: activeButtonBorderColor,
              label: __('Active tab button border'),
              onColorChange: value => {
                setAttributes({
                  activeButtonBorderColor: value,
                });
                onButtonColorChange(value, 'activeButtonBorderColor');
              },
            },
          ]}
          panelId={clientId}
          {...colorGradientSettings}
          gradients={[]}
          disableCustomGradients={true}
        />
      </InspectorControls>
    </Fragment>
  );
}

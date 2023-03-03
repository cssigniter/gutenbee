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
} from 'wp.components';
import {
  InspectorControls,
  __experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
  __experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from 'wp.blockEditor';

import getBlockId from '../../util/getBlockId';
import useUniqueId from '../../hooks/useUniqueId';

export default function Edit({ attributes, setAttributes, clientId }) {
  const {
    tabIndices,
    activeTabIndex,
    tabButtonAlignment,
    showPrice,
    showButton,
    numberColumns,
    numberProducts,
    buttonTextColor,
    buttonBgColor,
    buttonBorderColor,
    uniqueId,
  } = attributes;

  useUniqueId({ attributes, setAttributes, clientId });

  const blockProps = useBlockProps({
    id: getBlockId(uniqueId),
    className: `wp-block-gutenbee-product-tabs wp-block-gutenbee-product-tabs-${tabButtonAlignment}`,
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

  const onButtonBgColorChange = value => {
    if (!value) {
      value = buttonBgColor;
    }
    innerBlocks.forEach(block => {
      wp.data
        .dispatch('core/block-editor')
        .updateBlockAttributes(block.clientId, { buttonBgColor: value });
    });
  };

  const onButtonBorderColorChange = value => {
    if (!value) {
      value = buttonBorderColor;
    }
    innerBlocks.forEach(block => {
      wp.data
        .dispatch('core/block-editor')
        .updateBlockAttributes(block.clientId, { buttonBorderColor: value });
    });
  };

  useEffect(
    () => {
      innerBlocks.forEach(block => {
        if (
          !block.attributes.buttonBgColor &&
          !block.attributes.buttonBorderColor
        ) {
          wp.data
            .dispatch('core/block-editor')
            .updateBlockAttributes(block.clientId, {
              buttonBgColor: buttonBgColor,
              buttonBorderColor: buttonBorderColor,
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
            label={__('Tab Button Alignment')}
            value={tabButtonAlignment}
            onChange={value => {
              onChangeTabButtonAlignment(value);
            }}
          >
            <ToggleGroupControlOption label={__('Left')} value="left" />
            <ToggleGroupControlOption label={__('Center')} value="center" />
            <ToggleGroupControlOption label={__('Right')} value="right" />
          </ToggleGroupControl>
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
              label: __('Tab Button Text'),
              onColorChange: value =>
                setAttributes({
                  buttonTextColor: value,
                }),
              resetAllFilter: () => setAttributes({ buttonTextColor: '' }),
            },
            {
              colorValue: buttonBgColor,
              label: __('Tab Button Background'),
              onColorChange: value => {
                setAttributes({
                  buttonBgColor: value,
                });
                onButtonBgColorChange(value);
              },
              resetAllFilter: () => setAttributes({ buttonBgColor: '' }),
            },
            {
              colorValue: buttonBorderColor,
              label: __('Tab Button Border'),
              onColorChange: value => {
                setAttributes({
                  buttonBorderColor: value,
                });
                onButtonBorderColorChange(value);
              },
              resetAllFilter: () => setAttributes({ buttonBorderColor: '' }),
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

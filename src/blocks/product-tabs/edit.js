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
import { InspectorControls } from 'wp.blockEditor';

export default function Edit({
  attributes,
  setAttributes,
  isSelected,
  clientId,
}) {
  const {
    tabIndices,
    activeTabIndex,
    tabButtonAlignment,
    showPrice,
    showButton,
    numberColumns,
    numberProducts,
  } = attributes;

  const blockProps = useBlockProps({
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
    const { getSelectedBlockClientIds } = select('core/block-editor');
    return {
      tabClientId: getSelectedBlockClientIds(),
    };
  });

  const getTabIndexByClientId = tabClientId => {
    if (tabClientId.length !== 0) {
      let obj = tabIndices.find(o => o.clientId === tabClientId[0]);
      if (undefined !== obj) {
        return obj.tabIndex;
      } else {
        return activeTabIndex;
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

  const renderPlaceholder = () => {
    return (
      <div className="render-placeholder">
        {__('Fetching products, please wait.')}
      </div>
    );
  };

  const onChangeTabButtonAlignment = newTabButtonAlignment => {
    setAttributes({
      tabButtonAlignment:
        newTabButtonAlignment === undefined ? 'left' : newTabButtonAlignment,
    });
  };

  return (
    <Fragment>
      <div {...blockProps}>
        <ul className="wp-block-gutenbee-product-tabs-nav">
          <InnerBlocks
            allowedBlocks={['gutenbee/product-tab']}
            template={[['gutenbee/product-tab']]}
          />
        </ul>
        <ServerSideRender
          block="gutenbee/product-tabs"
          attributes={attributes}
          EmptyResponsePlaceholder={renderPlaceholder}
        />
      </div>

      {isSelected && (
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
              onBlur={function noRefCheck() {}}
              onChange={value =>
                setAttributes({
                  numberColumns: value !== '' ? value : '',
                })
              }
              onFocus={function noRefCheck() {}}
              onMouseLeave={function noRefCheck() {}}
              onMouseMove={function noRefCheck() {}}
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
              onBlur={function noRefCheck() {}}
              onChange={value =>
                setAttributes({
                  numberProducts: value !== '' ? value : '',
                })
              }
              onFocus={function noRefCheck() {}}
              onMouseLeave={function noRefCheck() {}}
              onMouseMove={function noRefCheck() {}}
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
      )}
    </Fragment>
  );
}

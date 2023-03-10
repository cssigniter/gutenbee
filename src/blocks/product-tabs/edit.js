import { InnerBlocks, useBlockProps } from 'wp.blockEditor';
import ServerSideRender from 'wp.serverSideRender';
import { useSelect } from 'wp.data';
import { useState, useEffect, useRef, Fragment } from 'wp.element';
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

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setContent(containerRef.current.innerHTML);
          setIsLoading(false);

          const $sliders = jQuery(
            '.wp-block-gutenbee-product-tabs-slider .gutenbee-product-tabs-content',
          );

          if ($sliders.length) {
            $sliders.each(function() {
              const $this = jQuery(this);

              $this.slick({
                arrows: true,
                dots: false,
                slidesToScroll: 3,
                slidesToShow: 3,
                prevArrow:
                  '<button class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M25.1 247.5l117.8-116c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L64.7 256l102.2 100.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.7 4.7-12.3 4.7-17 0L25 264.5c-4.6-4.7-4.6-12.3.1-17z"/></svg></button>',
                nextArrow:
                  '<button class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path d="M166.9 264.5l-117.8 116c-4.7 4.7-12.3 4.7-17 0l-7.1-7.1c-4.7-4.7-4.7-12.3 0-17L127.3 256 25.1 155.6c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0l117.8 116c4.6 4.7 4.6 12.3-.1 17z"/></svg></button>',
              });
            });
          }
        }
      }
    });

    observer.observe(containerRef.current, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, []);

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
        <div ref={containerRef}>
          {console.log(isLoading)}
          {console.log(content)}
          <ServerSideRender
            block="gutenbee/product-tabs"
            attributes={attributes}
          />
        </div>
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
          <SelectControl
            __next36pxDefaultSize
            __nextHasNoMarginBottom
            label="Layout"
            value={layout}
            onChange={value =>
              setAttributes({
                layout: value,
              })
            }
            options={[
              {
                label: 'Grid',
                value: 'grid',
              },
              {
                label: 'Slider',
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
            checked={showRating}
            label={__('Show rating')}
            onChange={value =>
              setAttributes({
                showRating: value,
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
              label: __('Tab Button Background'),
              onColorChange: value => {
                setAttributes({
                  buttonBgColor: value,
                });
                onButtonColorChange(value, 'buttonBgColor');
              },
            },
            {
              colorValue: buttonBorderColor,
              label: __('Tab Button Border'),
              onColorChange: value => {
                setAttributes({
                  buttonBorderColor: value,
                });
                onButtonColorChange(value, 'buttonBorderColor');
              },
            },
            {
              colorValue: activeButtonTextColor,
              label: __('Active Tab Button Text'),
              onColorChange: value => {
                setAttributes({
                  activeButtonTextColor: value,
                }),
                  onButtonColorChange(value, 'activeButtonTextColor');
              },
            },
            {
              colorValue: activeButtonBgColor,
              label: __('Active Tab Button Background'),
              onColorChange: value => {
                setAttributes({
                  activeButtonBgColor: value,
                });
                onButtonColorChange(value, 'activeButtonBgColor');
              },
            },
            {
              colorValue: activeButtonBorderColor,
              label: __('Active Tab Button Border'),
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

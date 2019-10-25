import { Fragment, useState, useEffect } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import { InspectorControls } from 'wp.editor';
import { PanelColorSettings, InnerBlocks } from 'wp.blockEditor';
import { PanelBody, SelectControl, RangeControl } from 'wp.components';
import { withDispatch, useSelect } from 'wp.data';
import { createBlock } from 'wp.blocks';
import times from 'lodash.times';
import dropRight from 'lodash.dropright';

import MarginControls from '../../components/controls/margin-controls';
import BackgroundControls from '../../components/controls/background-controls/BackgroundControl';
import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
import ResponsiveControl from '../../components/controls/responsive-control/ResponsiveControl';
import useUniqueId from '../../hooks/useUniqueId';
import ContainerStyle from './style';
import getBlockId from '../../util/getBlockId';
import {
  OneColumn,
  ThreeColumnsEqual,
  ThreeColumnsWideCenter,
  TwoColumnsEqual,
  TwoColumnsOneThirdTwoThirds,
  TwoColumnsTwoThirdsOneThird,
} from './template-icons';
import { getColumnsTemplate } from './utils';

const propTypes = {
  className: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  setAttributes: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
  updateColumns: PropTypes.func.isRequired,
};

const DEFAULT_COLUMNS = 1;
const TEMPLATE_OPTIONS = [
  {
    title: __('One column'),
    icon: <OneColumn />,
    template: [['gutenbee/column']],
  },
  {
    title: __('Two columns; equal split'),
    icon: <TwoColumnsEqual />,
    template: [['gutenbee/column'], ['gutenbee/column']],
  },
  {
    title: __('Two columns; one-third, two-thirds split'),
    icon: <TwoColumnsOneThirdTwoThirds />,
    template: [
      [
        'gutenbee/column',
        { width: { desktop: 33.33, tablet: 100, mobile: 100 } },
      ],
      [
        'gutenbee/column',
        { width: { desktop: 66.66, tablet: 100, mobile: 100 } },
      ],
    ],
  },
  {
    title: __('Two columns; two-thirds, one-third split'),
    icon: <TwoColumnsTwoThirdsOneThird />,
    template: [
      [
        'gutenbee/column',
        { width: { desktop: 66.66, tablet: 100, mobile: 100 } },
      ],
      [
        'gutenbee/column',
        { width: { desktop: 33.33, tablet: 100, mobile: 100 } },
      ],
    ],
  },
  {
    title: __('Three columns; equal split'),
    icon: <ThreeColumnsEqual />,
    template: [['gutenbee/column'], ['gutenbee/column'], ['gutenbee/column']],
  },
  {
    title: __('Three columns; wide center column'),
    icon: <ThreeColumnsWideCenter />,
    template: [
      ['gutenbee/column', { width: { desktop: 25, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 25, tablet: 100, mobile: 100 } }],
    ],
  },
];

const ContainerBlockEdit = ({
  className,
  attributes,
  setAttributes,
  clientId,
  updateColumns,
}) => {
  const {
    uniqueId,
    textColor,
    backgroundColor,
    backgroundImage,
    innerContentWidth,
    containerHeight,
    verticalContentAlignment,
    horizontalContentAlignment,
  } = attributes;

  const { count } = useSelect(select => {
    return {
      count: select('core/block-editor').getBlockCount(clientId),
    };
  });

  const [template, setTemplate] = useState(getColumnsTemplate(count));
  const [forceUseTemplate, setForceUseTemplate] = useState(false);

  // This is used to force the usage of the template even if the count doesn't match the template
  // The count doesn't match the template once you use undo/redo (this is used to reset to the placeholder state).
  useEffect(
    () => {
      // Once the template is applied, reset it.
      if (forceUseTemplate) {
        setForceUseTemplate(false);
      }
    },
    [forceUseTemplate],
  );
  const showTemplateSelector = (count === 0 && !forceUseTemplate) || !template;

  useUniqueId({
    attributes,
    setAttributes,
    clientId,
  });

  const blockId = getBlockId(uniqueId);

  return (
    <Fragment>
      <ContainerStyle attributes={attributes} />

      <div
        id={blockId}
        className={className}
        style={{
          color: textColor,
          justifyContent: horizontalContentAlignment,
          alignItems: verticalContentAlignment,
        }}
      >
        <div className={`${className}-inner`}>
          <div className={`${className}-row`}>
            <InnerBlocks
              __experimentalTemplateOptions={TEMPLATE_OPTIONS}
              __experimentalOnSelectTemplateOption={nextTemplate => {
                if (nextTemplate === undefined) {
                  nextTemplate = getColumnsTemplate(DEFAULT_COLUMNS);
                }

                setTemplate(nextTemplate);
                setForceUseTemplate(true);
              }}
              __experimentalAllowTemplateOptionSkip
              template={showTemplateSelector ? null : template}
              templateLock="all"
              allowedBlocks={['gutenbee/column']}
            />
          </div>
        </div>
        <div
          className={`${className}-background`}
          style={{
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
          }}
        />
      </div>

      {!showTemplateSelector && (
        <Fragment>
          <InspectorControls>
            <PanelBody title={__('Layout Settings')} initialOpen>
              <RangeControl
                label={__('Columns')}
                min={1}
                max={12}
                value={count}
                onChange={value => updateColumns(count, value)}
                step={1}
              />

              <ResponsiveControl>
                {breakpoint => (
                  <Fragment>
                    <RangeControl
                      label={__('Container Height (px)')}
                      min={-1}
                      max={1200}
                      value={containerHeight[breakpoint]}
                      onChange={value =>
                        setAttributes({
                          containerHeight: {
                            ...containerHeight,
                            [breakpoint]: value,
                          },
                        })
                      }
                      step={10}
                    />
                    <span className={`${className}-description`}>
                      {__(
                        'Leave blank for auto height or set to -1 for full viewport height.',
                      )}
                    </span>
                  </Fragment>
                )}
              </ResponsiveControl>

              <ResponsiveControl>
                {breakpoint => (
                  <Fragment>
                    <RangeControl
                      label={__('Content Width (px)')}
                      min={-1}
                      max={2500}
                      value={innerContentWidth[breakpoint]}
                      onChange={value =>
                        setAttributes({
                          innerContentWidth: {
                            ...innerContentWidth,
                            [breakpoint]: value,
                          },
                        })
                      }
                      step={1}
                    />

                    <span className={`${className}-description`}>
                      {__('Set to -1 for 100% width.')}
                    </span>
                  </Fragment>
                )}
              </ResponsiveControl>

              <ResponsiveControl>
                {breakpoint => (
                  <MarginControls
                    label={__('Padding (px)')}
                    attributeKey="blockPadding"
                    attributes={attributes}
                    setAttributes={setAttributes}
                    breakpoint={breakpoint}
                  />
                )}
              </ResponsiveControl>

              <ResponsiveControl>
                {breakpoint => (
                  <MarginControls
                    label={__('Margin (px)')}
                    attributeKey="blockMargin"
                    attributes={attributes}
                    setAttributes={setAttributes}
                    breakpoint={breakpoint}
                  />
                )}
              </ResponsiveControl>

              <SelectControl
                label={__('Vertical Content Alignment')}
                value={verticalContentAlignment}
                options={[
                  { value: 'flex-start', label: __('Top') },
                  { value: 'center', label: __('Middle') },
                  { value: 'flex-end', label: __('Bottom') },
                ]}
                onChange={value =>
                  setAttributes({ verticalContentAlignment: value })
                }
              />

              <SelectControl
                label={__('Horizontal Content Alignment')}
                value={horizontalContentAlignment}
                options={[
                  { value: 'flex-start', label: __('Left') },
                  { value: 'center', label: __('Center') },
                  { value: 'flex-end', label: __('Right') },
                ]}
                onChange={value =>
                  setAttributes({ horizontalContentAlignment: value })
                }
              />

              <span className={`${className}-description`}>
                {__(
                  'The content alignment settings apply when Container Height and/or the Content Width are set.',
                )}
              </span>
            </PanelBody>

            <PanelColorSettings
              title={__('Color Settings')}
              initialOpen={false}
              colorSettings={[
                {
                  value: backgroundColor,
                  onChange: value => setAttributes({ backgroundColor: value }),
                  label: __('Background Color'),
                },
                {
                  value: textColor,
                  onChange: value => setAttributes({ textColor: value }),
                  label: __('Text Color'),
                },
              ]}
              onChange={value => setAttributes({ backgroundColor: value })}
            >
              <BackgroundControls
                label={__('Background Image')}
                setAttributes={setAttributes}
                attributes={attributes}
                attributeKey="backgroundImage"
                supportsParallax
              />
            </PanelColorSettings>
          </InspectorControls>
        </Fragment>
      )}
    </Fragment>
  );
};

ContainerBlockEdit.propTypes = propTypes;

const withColumnControls = withDispatch((dispatch, ownProps, registry) => ({
  updateColumns: (previousColumns, newColumns) => {
    const { clientId } = ownProps;
    const { replaceInnerBlocks } = dispatch('core/block-editor');
    const { getBlocks } = registry.select('core/block-editor');

    let innerBlocks = getBlocks(clientId);

    // Redistribute available width for existing inner blocks.
    const isAddingColumn = newColumns > previousColumns;

    if (isAddingColumn) {
      innerBlocks = [
        ...innerBlocks,
        ...times(newColumns - previousColumns, () => {
          return createBlock('gutenbee/column');
        }),
      ];
    } else {
      // The removed column will be the last of the inner blocks.
      innerBlocks = dropRight(innerBlocks, previousColumns - newColumns);

      // if (hasExplicitWidths) {
      //   // Redistribute as if block is already removed.
      //   const widths = getRedistributedColumnWidths(innerBlocks, 100);
      //
      //   innerBlocks = getMappedColumnWidths(innerBlocks, widths);
      // }
    }

    replaceInnerBlocks(clientId, innerBlocks, false);
  },
}));

export default compose(withColumnControls)(ContainerBlockEdit);

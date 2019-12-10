import { Fragment, useState, useEffect } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import { InspectorControls } from 'wp.blockEditor';
import { PanelColorSettings, InnerBlocks } from 'wp.blockEditor';
import { PanelBody, SelectControl, RangeControl } from 'wp.components';
import { withDispatch, withSelect, useSelect } from 'wp.data';
import { createBlock } from 'wp.blocks';
import times from 'lodash.times';
import dropRight from 'lodash.dropright';
import classNames from 'classnames';

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
import { getColumnsTemplate, getMappedColumnWidths } from './utils';
import Rule from '../../components/stylesheet/Rule';

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
    template: [
      [
        'gutenbee/column',
        { width: { desktop: 100, tablet: 100, mobile: 100 } },
      ],
    ],
  },
  {
    title: __('Two columns; equal split'),
    icon: <TwoColumnsEqual />,
    template: [
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
      ['gutenbee/column', { width: { desktop: 50, tablet: 100, mobile: 100 } }],
    ],
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
    gutter,
    columnDirection,
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
  const className = 'wp-block-gutenbee-container';

  const classes = classNames(blockId, className);

  return (
    <Fragment>
      <ContainerStyle attributes={attributes}>
        <Rule
          value={columnDirection}
          rule=".wp-block-gutenbee-container-row > .editor-inner-blocks > .editor-block-list__layout { flex-direction: %s; }"
        />
      </ContainerStyle>

      <div
        id={blockId}
        className={classes}
        style={{
          color: textColor,
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
                max={9}
                value={count}
                onChange={value => updateColumns(count, value)}
              />

              <ResponsiveControl>
                {breakpoint => (
                  <SelectControl
                    label={__('Column Direction')}
                    value={columnDirection[breakpoint]}
                    options={[
                      { value: '', label: __('Normal') },
                      { value: 'row-reverse', label: __('Reverse') },
                    ]}
                    onChange={value =>
                      setAttributes({
                        columnDirection: {
                          ...columnDirection,
                          [breakpoint]: value,
                        },
                      })
                    }
                  />
                )}
              </ResponsiveControl>

              <SelectControl
                label={__('Gutter Width')}
                value={gutter}
                options={[
                  { value: 'none', label: __('No gutter (0px)') },
                  { value: 'sm', label: __('Small (10px)') },
                  { value: 'md', label: __('Medium (20px)') },
                  { value: 'lg', label: __('Large (30px)') },
                  { value: 'xl', label: __('Extra Large (40px)') },
                ]}
                onChange={value => setAttributes({ gutter: value })}
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
                            [breakpoint]: value != null ? value : '',
                          },
                        })
                      }
                      step={10}
                      help={__(
                        'Leave blank for auto height or set to -1 for full viewport height.',
                      )}
                    />
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
                      onChange={value => {
                        setAttributes({
                          innerContentWidth: {
                            ...innerContentWidth,
                            [breakpoint]: value != null ? value : '',
                          },
                        });
                      }}
                      step={1}
                      help={__('Set to -1 for 100% width.')}
                    />
                  </Fragment>
                )}
              </ResponsiveControl>

              <ResponsiveControl>
                {breakpoint => (
                  <SelectControl
                    label={__('Vertical Content Alignment')}
                    value={verticalContentAlignment[breakpoint]}
                    options={[
                      { value: '', label: '' },
                      { value: 'flex-start', label: __('Top') },
                      { value: 'center', label: __('Middle') },
                      { value: 'flex-end', label: __('Bottom') },
                    ]}
                    onChange={value =>
                      setAttributes({
                        verticalContentAlignment: {
                          ...verticalContentAlignment,
                          [breakpoint]: value,
                        },
                      })
                    }
                  />
                )}
              </ResponsiveControl>

              <ResponsiveControl>
                {breakpoint => (
                  <SelectControl
                    label={__('Horizontal Content Alignment')}
                    value={horizontalContentAlignment[breakpoint]}
                    options={[
                      { value: '', label: '' },
                      { value: 'flex-start', label: __('Left') },
                      { value: 'center', label: __('Center') },
                      { value: 'flex-end', label: __('Right') },
                    ]}
                    onChange={value =>
                      setAttributes({
                        horizontalContentAlignment: {
                          ...horizontalContentAlignment,
                          [breakpoint]: value,
                        },
                      })
                    }
                    help={__(
                      'The content alignment settings apply when Container Height and/or the Content Width are set.',
                    )}
                  />
                )}
              </ResponsiveControl>
            </PanelBody>

            <PanelColorSettings
              title={__('Block Appearance')}
              initialOpen={false}
              colorSettings={[
                {
                  value: textColor,
                  onChange: value => setAttributes({ textColor: value }),
                  label: __('Text Color'),
                },
                {
                  value: backgroundColor,
                  onChange: value => setAttributes({ backgroundColor: value }),
                  label: __('Background Color'),
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
          </InspectorControls>
        </Fragment>
      )}
    </Fragment>
  );
};

ContainerBlockEdit.propTypes = propTypes;

const withActiveBreakpoint = withSelect(select => {
  const activeBreakpoint = select('gutenbee-breakpoints').getBreakpoint();

  return {
    activeBreakpoint,
  };
});

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
        ...getMappedColumnWidths(innerBlocks),
        ...times(newColumns - previousColumns, () => {
          return createBlock('gutenbee/column');
        }),
      ];
    } else {
      // The removed column will be the last of the inner blocks.
      innerBlocks = dropRight(innerBlocks, previousColumns - newColumns);
      innerBlocks = getMappedColumnWidths(innerBlocks);
    }

    replaceInnerBlocks(clientId, innerBlocks, false);
  },
}));

export default compose(
  withActiveBreakpoint,
  withColumnControls,
)(ContainerBlockEdit);

import { Fragment, useState, useEffect } from 'wp.element';
import PropTypes from 'prop-types';
import { compose } from 'wp.compose';
import { __ } from 'wp.i18n';
import { InnerBlocks } from 'wp.blockEditor';
import { withDispatch, withSelect, useSelect } from 'wp.data';
import { createBlock } from 'wp.blocks';
import times from 'lodash.times';
import dropRight from 'lodash.dropright';
import classNames from 'classnames';

import { getBackgroundImageStyle } from '../../components/controls/background-controls/helpers';
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
import { hexToRGBA } from '../../components/controls/advanced-color-control/helpers';
import ContainerInspectorControls from './inspector-controls';

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
    columnDirection,
    overlayBackgroundColor,
    overlayBackgroundColorOpacity,
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

        {overlayBackgroundColor && (
          <div
            className={`${className}-background-overlay`}
            style={{
              backgroundColor: hexToRGBA(
                overlayBackgroundColor,
                overlayBackgroundColorOpacity,
              ),
            }}
          />
        )}

        <div
          className={`${className}-background`}
          style={{
            backgroundColor,
            ...getBackgroundImageStyle(backgroundImage),
          }}
        />
      </div>

      {!showTemplateSelector && (
        <ContainerInspectorControls
          attributes={attributes}
          setAttributes={setAttributes}
          columnCount={count}
          updateColumns={updateColumns}
        />
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
